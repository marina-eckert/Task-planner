import React from "react";

interface TaskCardProps {
  title: string;
  date: string | null;
  participant: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, date, participant }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No deadline";
    return new Date(dateString).toLocaleDateString();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.defaultPrevented) {
      return;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-project border border-gray-200 rounded-lg p-3 mb-3 hover:shadow-md transition-shadow cursor-pointer select-none"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      <h3 className="font-medium text-sm mb-2 line-clamp-2 pointer-events-none">
        {title}
      </h3>
      <div className="text-xs text-gray-500 space-y-1 pointer-events-none">
        <p>
          <span className="font-medium">Due:</span> {formatDate(date)}
        </p>
        <p>
          <span className="font-medium">Assigned:</span> {participant}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
