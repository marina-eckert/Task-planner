import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../types/index";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  draggedTask: Task | null;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: () => void;
  getAssigneeNames: (assigneeIds: number[]) => string;
  t: (key: string) => string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  draggedTask,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  getAssigneeNames,
  t,
}) => {
  return (
    <div
      className={`bg-card rounded-xl p-4 transition hover:scale-105 hover:shadow-lg min-h-[200px] ${
        draggedTask && draggedTask.status !== status
          ? "border-2 border-dashed border-blue-400 bg-blue-50"
          : ""
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2 className="font-medium mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onDragEnd={onDragEnd}
            className={`cursor-move transition-opacity ${
              draggedTask && draggedTask.id === task.id
                ? "opacity-50"
                : "opacity-100"
            }`}
          >
            <Link to={`/tasks/${task.id}`}>
              <TaskCard
                title={task.title}
                date={task.due_date}
                participant={getAssigneeNames(task.assignees)}
              />
            </Link>
          </div>
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="text-gray-400 text-sm text-center py-8">
          {t("no_tasks")}
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
