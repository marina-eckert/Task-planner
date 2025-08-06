import { useState } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import type { Task, User, TaskStatus } from "../types/index";

interface TaskBoardProps {
  tasks: Task[];
  users: User[];
  onTaskUpdate: (task: Task) => void;
  t: (key: string) => string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  users,
  onTaskUpdate,
  t,
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const groupByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  const getAssigneeNames = (assigneeIds: number[]) => {
    if (!assigneeIds || assigneeIds.length === 0) return "Not assigned";
    const names = assigneeIds
      .map((id) => users.find((user) => user.id === id)?.username)
      .filter(Boolean);

    if (names.length === 0) return "Not assigned";

    if (names.length > 3) {
      return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
    }

    return names.join(", ");
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();

    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    try {
      const updatedTask = { ...draggedTask, status: newStatus };
      onTaskUpdate(updatedTask);

      console.log(`Task "${draggedTask.title}" moved to ${newStatus}`);

      try {
        const token = localStorage.getItem("token");

        const minimalUpdateData = {
          title: draggedTask.title,
          description: draggedTask.description || "",
          priority: draggedTask.priority || "medium",
          status: newStatus,
          due_date: draggedTask.due_date,
          estimated_hours: draggedTask.estimated_hours || null,
          assignees: draggedTask.assignees || [],
        };

        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/tasks/${draggedTask.id}`,
          minimalUpdateData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log("Backend updated successfully");
      } catch (backendError) {
        console.error("Backend update failed:", backendError);
      }
    } catch (error) {
      console.error("Error in drag and drop operation:", error);
      onTaskUpdate({ ...draggedTask, status: draggedTask.status });
      alert("Failed to update task status. Please try again.");
    } finally {
      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const columns: Array<{ title: string; key: TaskStatus }> = [
    { title: t("todo"), key: "todo" },
    { title: t("in_progress"), key: "in_progress" },
    { title: t("done"), key: "done" },
    { title: t("frozen"), key: "frozen" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map(({ title, key }) => (
        <TaskColumn
          key={key}
          title={title}
          status={key}
          tasks={groupByStatus(key)}
          draggedTask={draggedTask}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          getAssigneeNames={getAssigneeNames}
          t={t}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
