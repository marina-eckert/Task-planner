import type { Project, Task, TaskStatus } from "../types/index";

interface ProjectInfoCardsProps {
  project: Project;
  tasks: Task[];
  t: (key: string) => string;
}

const ProjectInfoCards: React.FC<ProjectInfoCardsProps> = ({
  project,
  tasks,
  t,
}) => {
  const desc = project.description || "";
  const start = desc.match(/Start: ([^,]+)/)?.[1] || "";
  const end = desc.match(/End: ([^,]+)/)?.[1] || "";
  const team = desc.match(/Team: (.+)/)?.[1] || "";
  const customDescription = desc.split("\n")[0];

  const groupByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-card p-4 rounded-xl text-sm">
        <p>
          <span className="font-medium">{t("added_date")}:</span> {start}
        </p>
        <p>
          <span className="font-medium">{t("deadline")}:</span> {end}
        </p>
        <p>
          <span className="font-medium">{t("participants")}:</span> {team}
        </p>
      </div>

      <div className="bg-card p-4 rounded-xl col-span-2 text-sm">
        {customDescription}
      </div>

      <div className="bg-card p-4 rounded-xl text-sm">
        <p>
          <span className="font-medium">{t("all_tasks")}:</span> {tasks.length}
        </p>
        <p>
          <span className="font-medium">{t("done")}:</span>{" "}
          {groupByStatus("done").length}
        </p>
        <p>
          <span className="font-medium">{t("in_progress")}:</span>{" "}
          {groupByStatus("in_progress").length}
        </p>
        <p>
          <span className="font-medium">{t("frozen")}:</span>{" "}
          {groupByStatus("frozen").length}
        </p>
      </div>
    </div>
  );
};

export default ProjectInfoCards;
