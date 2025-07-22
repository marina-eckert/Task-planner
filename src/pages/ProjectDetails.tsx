import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ProjectDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const found = res.data.find((p: any) => p.id === Number(id));
        setProject(found);
      } catch (err) {
        console.error("Ошибка загрузки проекта:", err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project)
    return (
      <MainLayout>
        <p>{t("loading")}</p>
      </MainLayout>
    );

  const desc = project.description || "";
  const start = desc.match(/Start: ([^,]+)/)?.[1] || "";
  const end = desc.match(/End: ([^,]+)/)?.[1] || "";
  const team = desc.match(/Team: (.+)/)?.[1] || "";
  const customDescription = desc.split("\n")[0];

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <div className="space-y-2 text-sm text-gray-700 font-medium">
        <p>
          {t("description")}: {customDescription}
        </p>
        <p>
          {t("start_date")}: {start}
        </p>
        <p>
          {t("end_date")}: {end}
        </p>
        <p>
          {t("team")}: {team}
        </p>
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
