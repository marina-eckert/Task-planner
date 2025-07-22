import { NavLink } from "react-router-dom";
import logo from "../assets/images/icon.svg";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <aside className="w-[20%] bg-sidebar min-h-screen flex flex-col font-rubik font-medium text-black">
      <div className="mr-auto ml-auto p-16">
        <img src={logo} alt="Logo" className="" />
      </div>

      <nav className="flex flex-col gap-2 text-sm px-6 max-w-[60%] ml-10">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-md ${
              isActive ? "bg-project" : "font-normal"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="text-lg">—</span>}
              <span>{t("clients")}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/task_manager"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-md ${
              isActive ? "bg-project" : "font-normal"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="text-lg">—</span>}
              <span>{t("task_manager")}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-md ${
              isActive ? "bg-project" : "font-normal"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="text-lg">—</span>}
              <span>{t("tasks")}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-md ${
              isActive ? "bg-project" : "font-normal"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="text-lg">—</span>}
              <span>{t("contacts")}</span>
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
