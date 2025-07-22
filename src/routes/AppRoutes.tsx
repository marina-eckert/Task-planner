import { Routes, Route } from "react-router-dom";

import Sign_in from "../pages/Sign_in";
import Sign_up from "../pages/Sign_up";
import Dashboard from "../pages/Dashboard";
import Task_Manager from "../pages/Task_manager";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AccountSettings from "../pages/AccountSettings";
import CreateProject from "../pages/CreateProject";
import ProjectDetails from "../pages/ProjectDetails";
import CreateTask from "../pages/CreateTask";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sign_in />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task_manager" element={<Task_Manager />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/header" element={<Header />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<AccountSettings />} />
      <Route path="/create_project" element={<CreateProject />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/create_task" element={<CreateTask />} />
    </Routes>
  );
};

export default AppRoutes;
