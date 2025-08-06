import { useEffect, useState } from "react";
import { Users, Calendar, Upload, SquarePlus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Card: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      //const res = await axios.get("http://localhost:5000/api/projects", {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProjects(res.data);
    } catch (err) {
      console.error("Ошибка загрузки проектов:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/project/${id}`);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("Вы уверены, что хотите удалить проект?")) return;

    try {
      const token = localStorage.getItem("token");
      //await axios.delete(`http://localhost:5000/api/projects/${id}`, {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
      alert("Не удалось удалить проект.");
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl max-w-8xl mt-6 font-rubik font-normal">
      <div className="flex justify-between">
        <h2 className="text-2xl flex">
          {t("projects")}{" "}
          <Link to="/create_project" className="cursor-pointer ml-4 mt-1">
            <SquarePlus size={22} />
          </Link>
        </h2>

        <button className="text-sm flex items-center text-gray-700 hover:text-black">
          <Upload size={16} className="mr-1" />
          {t("export")}
        </button>
      </div>

      <div className="flex flex-col space-y-3 mt-4">
        {projects.map((project) => {
          const desc = project.description || "";
          const dateStart = desc.match(/Start: ([^,]+)/)?.[1] || "";
          const dateEnd = desc.match(/End: ([^,]+)/)?.[1] || "";
          const team = desc.match(/Team: (.+)/)?.[1] || "";

          return (
            <div
              key={project.id}
              onClick={() => handleClick(project.id)}
              className="flex items-center justify-between px-4 py-3 bg-project rounded-xl transition-transform duration-300 ease-in-out hover:scale-103 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="text-sm font-medium">{project.name}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {t("start_date")}: {dateStart}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {t("end_date")}: {dateEnd}
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {t("team")}: {team}
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => handleDelete(project.id, e)}
                className="text-red-500 hover:text-red-700 cursor-pointer transition"
                title="Удалить проект"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
