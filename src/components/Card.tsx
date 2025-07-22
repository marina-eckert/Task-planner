import { useEffect, useState } from "react";
import { Users, Calendar, Upload, SquarePlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Card: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(res.data);
      } catch (err) {
        console.error("Ошибка загрузки проектов:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/project/${id}`);
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
              <div className="text-sm font-medium">{project.name}</div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
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
          );
        })}
      </div>
    </div>
  );
};

export default Card;
