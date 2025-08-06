import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { useTranslation } from "react-i18next";

const CreateTask: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");

  const [title, setTitle] = useState("");
  const [assignees, setAssignees] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [users, setUsers] = useState<any[]>([]);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error loading users:", err);
        setUsers([]);
      }
    };

    const fetchProject = async () => {
      if (projectId) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/projects`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const found = res.data.find((p: any) => p.id === Number(projectId));
          setProject(found);
        } catch (err) {
          console.error("Error loading project:", err);
        }
      }
    };

    fetchUsers();
    fetchProject();
  }, [projectId]);

  const handleAssigneeChange = (userId: number, isChecked: boolean) => {
    setAssignees((prev) =>
      isChecked ? [...prev, userId] : prev.filter((id) => id !== userId),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Not authorized");

      const newTask = {
        title,
        description,
        project_id: Number(projectId),
        assignees: assignees,
        priority,
        due_date: deadline,
        status,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Error creating task");
    }
  };

  if (!project) {
    return (
      <MainLayout>
        <p>{t("loading")}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <nav className="text-sm text-gray-500 mb-2">
        {t("dashboard")} &gt; {project.name} &gt; {t("create_task")}
      </nav>
      <h1 className="text-2xl font-medium mb-6">{t("create_task")}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-xl max-w-xl font-rubik space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">{t("task_title")}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            placeholder={t("enter_title")}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("participants")}</label>
          <div className="border border-gray-300 rounded px-3 py-2 max-h-32 overflow-y-auto">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center space-x-2 text-sm py-1 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={assignees.includes(user.id)}
                    onChange={(e) =>
                      handleAssigneeChange(user.id, e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <span>{user.username}</span>
                </label>
              ))
            ) : (
              <span className="text-gray-500 text-sm">
                {t("no_users_available") || "No users available"}
              </span>
            )}
          </div>
          {assignees.length > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              {t("selected") || "Selected"}: {assignees.length}{" "}
              {t("participants") || "participants"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">{t("description")}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            placeholder={t("task_description")}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("deadline")}</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("priority")}</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          >
            <option value="low">{t("low")}</option>
            <option value="medium">{t("medium")}</option>
            <option value="high">{t("high")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">{t("status")}</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          >
            <option value="todo">{t("todo")}</option>
            <option value="in_progress">{t("in_progress")}</option>
            <option value="done">{t("done")}</option>
            <option value="frozen">{t("frozen")}</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(`/project/${projectId}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 text-sm"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="bg-fusion text-white px-4 py-2 rounded hover:bg-fusion-dark transition duration-200 text-sm"
          >
            {t("create")}
          </button>
        </div>
      </form>
    </MainLayout>
  );
};

export default CreateTask;
