import { Routes, Route } from "react-router-dom";

import Sign_in from "../pages/Sign_in";
import Sign_up from "../pages/Sign_up";
import Dashboard from "../pages/Dashboard";
import Task_Manager from "../pages/Task_manager";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sign_in />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task_manager" element={<Task_Manager />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/header" element={<Header />} />
      <Route path="/card" element={<Card />} />
    </Routes>
  );
};

export default AppRoutes;
