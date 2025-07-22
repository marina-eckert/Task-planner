import React from "react";
import type { Task } from "../types/index";
import { useTranslation } from "react-i18next";

type Props = Pick<Task, "title" | "participant" | "date">;

const TaskCard: React.FC<Props> = ({ title, participant, date }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-project p-4 rounded-lg mb-3 transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-sm cursor-pointer">
      <div className="font-medium text-base mb-2">{title}</div>
      <div className="text-sm text-gray-500">
        {t("added_date")}: {date}
      </div>
      <div className="text-sm text-gray-500">
        {t("participants")}: {participant}
      </div>
    </div>
  );
};

export default TaskCard;
