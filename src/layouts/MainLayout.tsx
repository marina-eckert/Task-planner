import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FadeSlideIn from "../layouts/FadeSlideIn";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <FadeSlideIn>
          <main className="p-4 text-black font-rubik font-normal mt-4 ml-8 mr-24">
            {children}
          </main>
        </FadeSlideIn>
      </div>
    </div>
  );
};

export default MainLayout;
