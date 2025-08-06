import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useTranslation } from "react-i18next";

const CreateProject: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Not authorized");

      const fullDescription = `${description}\nStart: ${dateStart}, End: ${dateEnd}, Team: ${team}`;
      const newProject = {
        name: title,
        description: fullDescription,
      };

      //await axios.post("http://localhost:5000/api/projects", newProject, {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/projects`,
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <MainLayout>
      <nav className="text-sm text-gray-500 mb-2">
        {t("dashboard")} &gt; {t("projects")} &gt; {t("create_project")}
      </nav>
      <h1 className="text-2xl font-medium mb-6">{t("create_project")}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-xl max-w-xl font-rubik space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">{t("project_title")}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("description")}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            placeholder="Project description..."
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">{t("start_date")}</label>
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">{t("end_date")}</label>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">{t("team")}</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="John, Alice, Bob"
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          />
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

export default CreateProject;
