import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

// TODO: Добавить типизацию компонента - const Dashboard: React.FC = () => {
function Dashboard() {
  return (
    <MainLayout>
      <nav className="text-sm text-gray-500 mb-2">
        Dashboard &gt; Clients &gt;{" "}
      </nav>
      <h1 className="text-2xl font-medium mb-4">OcOO “Energi.kg”</h1>
      <Card />
    </MainLayout>
  );
}

export default Dashboard;
