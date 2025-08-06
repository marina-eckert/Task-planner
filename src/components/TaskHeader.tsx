import { Link } from "react-router-dom";
import type { Task } from "../types/index";

interface TaskHeaderProps {
  task: Task;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {
  return (
    <div className="text-sm text-gray-500 mb-2">
      <Link to="/dashboard">Dashboard</Link> &gt;{" "}
      <Link to={`/project/${task.project_id}`}>Project</Link> &gt;{" "}
      <span>{task.title}</span>
    </div>
  );
};

export default TaskHeader;
