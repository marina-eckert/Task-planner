import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <nav className="text-sm text-gray-500 mb-2">
        Dashboard &gt; {t("clients")} &gt;{" "}
      </nav>
      <h1 className="text-2xl font-medium mb-4">OcOO “Energi.kg”</h1>
      <Card />
    </MainLayout>
  );
};

export default Dashboard;
