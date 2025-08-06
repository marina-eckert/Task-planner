import { Link } from "react-router-dom";
import type { Project } from "../types/index";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <>
      <div className="text-sm text-gray-500 mb-2">
        <Link to="/dashboard">Dashboard</Link> &gt; <span>{project.name}</span>
      </div>
      <h1 className="text-2xl font-medium mb-4">{project.name}</h1>
    </>
  );
};

export default ProjectHeader;
