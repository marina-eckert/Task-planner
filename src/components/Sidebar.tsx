import { NavLink } from "react-router-dom";
import logo from "../assets/images/icon.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface SidebarProps {
  isVisible?: boolean;
  isAnimating?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isVisible = true,
  isAnimating = false,
}) => {
  const { t } = useTranslation();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isAnimating) {
      if (isVisible) {
        setAnimationClass("sidebar-enter");
      } else {
        setAnimationClass("sidebar-exit");
      }
    } else {
      setAnimationClass("");
    }
  }, [isVisible, isAnimating]);

  return (
    <aside
      className={`w-full bg-sidebar min-h-full flex flex-col font-rubik font-medium text-black ${animationClass}`}
    >
      <div className="mr-auto ml-auto p-16">
        <img src={logo} alt="Logo" className="" />
      </div>

      <nav className="flex flex-col gap-2 text-sm px-6 max-w-[60%] ml-10">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-md smooth-transition ${
              isActive ? "bg-project" : "font-normal hover:bg-gray-100"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="text-lg">—</span>}
              <span>{t("projects")}</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-md smooth-transition ${
              isActive ? "bg-project" : "font-normal hover:bg-gray-100"
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
