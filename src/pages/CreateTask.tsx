import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import type { Task } from "../types/index";

const CreateTask: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [participant, setParticipant] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [status, setStatus] = useState<
    "todo" | "in-progress" | "closed" | "frozen"
  >("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      title,
      participant,
      date,
      priority,
      status,
    };

    console.log("Новая задача:", newTask);

    navigate("/dashboard");
  };

  return (
    <MainLayout>
      <nav className="text-sm text-gray-500 mb-2">
        {t("dashboard")} &gt; {t("tasks")} &gt; {t("create_task")}
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
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("participant")}</label>
          <input
            type="text"
            value={participant}
            onChange={(e) => setParticipant(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("deadline")}</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("priority")}</label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
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
            onChange={(e) =>
              setStatus(
                e.target.value as "todo" | "in-progress" | "closed" | "frozen",
              )
            }
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          >
            <option value="todo">{t("to_do")}</option>
            <option value="in-progress">{t("in_progress")}</option>
            <option value="done">{t("done")}</option>
            <option value="frozen1">{t("frozen1")}</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-fusion text-white px-4 py-2 rounded hover:bg-fusion-dark transition duration-200 text-sm"
        >
          {t("create")}
        </button>
      </form>
    </MainLayout>
  );
};

export default CreateTask;
