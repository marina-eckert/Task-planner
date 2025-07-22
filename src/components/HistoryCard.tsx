import type { HistoryItem } from "../types/index";
import { useTranslation } from "react-i18next";

const HistoryCard: React.FC<HistoryItem> = ({
  title,
  activity,
  description,
  user,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-project cursor-pointer rounded-xl p-4 mb-4 text-sm shadow-sm transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-md">
      <div className="font-medium mb-1">{title}</div>
      <p className="text-xs mb-1">
        <span className="text-search font-medium">{t("active")}:</span>{" "}
        {activity}
      </p>
      <p className="text-xs mb-1">{description}</p>
      <p className="text-xs font-medium text-black">{user}</p>
    </div>
  );
};

export default HistoryCard;
