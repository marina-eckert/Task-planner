import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FadeSlideIn from "../layouts/FadeSlideIn";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleSidebar = () => {
    setIsAnimating(true);
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [sidebarVisible]);

  return (
    <div className="flex min-h-screen">
      <div
        className={`smooth-transition ${sidebarVisible ? "w-[20%]" : "w-0"} overflow-hidden`}
      >
        <Sidebar isVisible={sidebarVisible} isAnimating={isAnimating} />
      </div>
      <div className="flex flex-col flex-1 smooth-transition">
        <Header
          onToggleSidebar={toggleSidebar}
          sidebarVisible={sidebarVisible}
        />
        <FadeSlideIn>
          <main
            className={`p-4 text-black font-rubik font-normal mt-4 mr-24 smooth-transition ${sidebarVisible ? "ml-8" : "ml-24"}`}
          >
            {children}
          </main>
        </FadeSlideIn>
      </div>
    </div>
  );
};

export default MainLayout;
