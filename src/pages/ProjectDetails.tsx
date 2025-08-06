import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProjectHeader from "../components/ProjectHeader";
import ProjectInfoCards from "../components/ProjectInfoCards";
import TaskBoard from "../components/TaskBoard";
import GanttChart from "../components/GanttChart";
import type { Project, Task, User } from "../types/index";

const ProjectDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/projects`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const found = res.data.find((p: Project) => p.id === Number(id));
        setProject(found);
      } catch (err) {
        console.error("Error loading project:", err);
      }
    };

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/tasks?project_id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Error loading tasks:", err);
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
        const uniqueUserIds = [
          ...new Set(tasks.flatMap((task) => task.assignees || [])),
        ];
        const fallbackUsers: User[] = uniqueUserIds.map((id) => ({
          id,
          username: `User ${id}`,
          email: `user${id}@example.com`,
          role: "user" as const,
        }));
        setUsers(fallbackUsers);
      }
    };

    fetchProject();
    fetchTasks().then(() => {
      fetchUsers();
    });
  }, [id]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
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
      <ProjectHeader project={project} />
      <ProjectInfoCards project={project} tasks={tasks} t={t} />

      <div className="text-right mb-4">
        <Link
          to={`/create_task?project_id=${project.id}`}
          className="bg-btn-green text-white px-4 py-2 rounded hover:bg-btn-green/90"
        >
          + {t("add_task")}
        </Link>
      </div>

      <TaskBoard
        tasks={tasks}
        users={users}
        onTaskUpdate={handleTaskUpdate}
        t={t}
      />

      <div className="mt-12 mb-6">
        <GanttChart tasks={tasks} users={users} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
