import MainLayout from "../layouts/MainLayout";
import TaskCard from "../components/TaskCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Task_Manager: React.FC = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="text-sm text-gray-500 mb-2">
        Dashboard &gt; <span>ToDoshnik</span>
      </div>

      <h1 className="text-2xl font-medium mb-4">{t("project_title")}</h1>

      {/* Info boxes */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card p-4 rounded-xl text-sm">
          <p>
            <span className="font-medium">{t("added_date")}:</span> 12/04/2021
          </p>
          <p>
            <span className="font-medium">{t("deadline")}:</span> 24/04/2021
          </p>
          <p>
            <span className="font-medium">{t("participants")}:</span> Adyl,
            Azhar, Arthur
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl col-span-2 text-sm">
          Менеджер для внутреннего пользования, предназначенный для учета
          статистики и трекинга задач.
        </div>
        <div className="bg-card p-4 rounded-xl text-sm">
          <p>
            <span className="font-medium">{t("all_tasks")}:</span> 6
          </p>
          <p>
            <span className="font-medium">{t("done")}:</span> 0
          </p>
          <p>
            <span className="font-medium">{t("frozen")}:</span> 1
          </p>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-4">
        {/* To Do */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">{t("to_do")}</h2>
            <button className="text-btn-green text-xl font-medium cursor-pointer transition-colors duration-200 hover:text-btn-green/80">
              <Link to={"/create_task"}>+</Link>
            </button>
          </div>
          <TaskCard
            title="CRM system design"
            date="12/04/2021"
            participant="Azhar"
          />
          <TaskCard title="Statistics" date="12/04/2021" participant="Artur" />
          <TaskCard
            title="Priorities"
            date="12/04/2021"
            participant="Adyl, Artur"
          />
        </div>

        {/* In progress */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-4">{t("in_progress")}</h2>
          <TaskCard
            title="Notifications"
            date="12/04/2021"
            participant="Artur"
          />
          <TaskCard title="Task types" date="12/04/2021" participant="Adyl" />
        </div>

        {/* Closed */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-4">{t("done")}</h2>
        </div>

        {/* Frozen */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-4">{t("frozen")}</h2>
          <TaskCard
            title="Todoshnik design"
            date="12/04/2021"
            participant="Azhar"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Task_Manager;
