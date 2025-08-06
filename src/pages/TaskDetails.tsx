import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useTranslation } from "react-i18next";
import TaskHeader from "../components/TaskHeader";
import TaskEditForm from "../components/TaskEditForm";
import TaskInfoCard from "../components/TaskInfoCard";
import TimeTracking from "../components/TimeTracking";
import CommentsSection from "../components/CommentsSection";
import TaskActionButtons from "../components/TaskActionButtons";
import type {
  Task,
  User,
  Comment,
  TimeLog,
  TaskEditForm as TaskEditFormType,
} from "../types/index";

const TaskDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TaskEditFormType>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    due_date: "",
    assignees: [],
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const foundTask = res.data.find((t: Task) => t.id === Number(id));

        if (!foundTask) {
          console.error("Task not found");
          navigate("/dashboard");
          return;
        }

        setTask(foundTask);
        setEditForm({
          title: foundTask.title || "",
          description: foundTask.description || "",
          priority: foundTask.priority || "medium",
          status: foundTask.status || "todo",
          due_date: foundTask.due_date ? foundTask.due_date.split("T")[0] : "",
          assignees: foundTask.assignees || [],
        });
      } catch (err) {
        console.error("Error loading task:", err);
        navigate("/dashboard");
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error loading users:", err);
        const fallbackUsers: User[] = [
          {
            id: 1,
            username: "User 1",
            email: "user1@example.com",
            role: "user",
          },
          {
            id: 2,
            username: "User 2",
            email: "user2@example.com",
            role: "user",
          },
          {
            id: 3,
            username: "User 3",
            email: "user3@example.com",
            role: "user",
          },
        ];
        setUsers(fallbackUsers);
      }
    };

    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/comments/task/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setComments(res.data);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };

    const loadDemoTimeLogs = () => {
      const demoLogs: TimeLog[] = [
        {
          id: 1,
          task_id: Number(id),
          user_id: 1,
          log_date: "2025-08-01",
          hours: 2.5,
          comment: "Initial setup and planning",
          created_at: "2025-08-01T10:00:00Z",
        },
        {
          id: 2,
          task_id: Number(id),
          user_id: 1,
          log_date: "2025-08-02",
          hours: 4.0,
          comment: "Implementation of core features",
          created_at: "2025-08-02T14:30:00Z",
        },
        {
          id: 3,
          task_id: Number(id),
          user_id: 1,
          log_date: "2025-08-03",
          hours: 1.5,
          comment: "Bug fixes and testing",
          created_at: "2025-08-03T16:15:00Z",
        },
      ];
      setTimeLogs(demoLogs);
    };

    if (id) {
      fetchTask();
      fetchUsers();
      fetchComments();
      loadDemoTimeLogs();
    }
  }, [id, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (!task) return;
    setIsEditing(false);
    setEditForm({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "medium",
      status: task.status || "todo",
      due_date: task.due_date ? task.due_date.split("T")[0] : "",
      assignees: task.assignees || [],
    });
  };

  const handleSaveEdit = async () => {
    if (!task) return;

    try {
      const updateData = {
        title: editForm.title,
        description: editForm.description,
        priority: editForm.priority,
        status: editForm.status,
        due_date: editForm.due_date || "",
        assignees: editForm.assignees,
      };

      setTask({ ...task, ...updateData });
      setIsEditing(false);

      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`,
          updateData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        alert(t("task_updated_successfully") || "Task updated successfully!");
      } catch (backendError) {
        console.error("Backend update failed:", backendError);
        alert(
          "Task updated locally, but server sync failed. Changes may not persist after page refresh.",
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
      alert(t("error_updating_task") || "Error updating task");
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (!task) return;

    const confirmDelete = window.confirm(
      t("confirm_delete_task") ||
        "Are you sure you want to delete this task? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(t("task_deleted_successfully") || "Task deleted successfully!");
      navigate(`/project/${task.project_id}`);
    } catch (err) {
      console.error("Error deleting task:", err);
      alert(t("error_deleting_task") || "Error deleting task");
    }
  };

  const handleFormChange = (updatedForm: TaskEditFormType) => {
    setEditForm(updatedForm);
  };

  const handleCommentsUpdate = (updatedComments: Comment[]) => {
    setComments(updatedComments);
  };

  const handleTimeLogsUpdate = (updatedTimeLogs: TimeLog[]) => {
    setTimeLogs(updatedTimeLogs);
  };

  if (!task) {
    return (
      <MainLayout>
        <p>{t("loading")}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <TaskHeader task={task} />

      {isEditing ? (
        <TaskEditForm
          editForm={editForm}
          onFormChange={handleFormChange}
          t={t}
        />
      ) : (
        <h1 className="text-2xl font-medium mb-4">{task.title}</h1>
      )}

      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <div className="col-span-1">
          {/* Task Description */}
          <div className="bg-card p-4 rounded-xl mb-4 text-sm leading-relaxed">
            {isEditing ? (
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                rows={4}
                placeholder={t("description") || "Description"}
              />
            ) : (
              task.description || "No description provided."
            )}
          </div>

          <TimeTracking
            taskId={Number(id)}
            timeLogs={timeLogs}
            onTimeLogsUpdate={handleTimeLogsUpdate}
            t={t}
          />

          <CommentsSection
            taskId={Number(id)}
            comments={comments}
            onCommentsUpdate={handleCommentsUpdate}
            t={t}
          />
        </div>

        <div className="col-span-1 space-y-2">
          <TaskInfoCard
            task={task}
            users={users}
            isEditing={isEditing}
            editForm={editForm}
            onFormChange={handleFormChange}
            t={t}
          />

          <TaskActionButtons
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            onDelete={handleDelete}
            t={t}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default TaskDetails;
