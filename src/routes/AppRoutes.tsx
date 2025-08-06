import { Routes, Route } from "react-router-dom";

import Sign_in from "../pages/Sign_in";
import Sign_up from "../pages/Sign_up";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Sidebar from "../components/Sidebar";
import AccountSettings from "../pages/AccountSettings";
import CreateProject from "../pages/CreateProject";
import CreateTask from "../pages/CreateTask";
import NotFound from "../pages/NotFound";
import ProjectDetails from "../pages/ProjectDetails";
import TaskDetails from "../pages/TaskDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sign_in />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<AccountSettings />} />
      <Route path="/create_project" element={<CreateProject />} />
      <Route path="/create_task" element={<CreateTask />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
