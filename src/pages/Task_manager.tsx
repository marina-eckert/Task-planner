import MainLayout from "../layouts/MainLayout";

// TODO: Добавить типизацию компонента - const Task_Manager: React.FC = () => {
const Task_Manager = () => {
  // TODO: Вынести TaskCard в отдельный компонент src/components/TaskCard.tsx
  const TaskCard = ({
    title,
    participant,
    date,
  }: {
    title: string;
    participant: string;
    date: string;
  }) => (
    <div className="bg-project p-4 rounded-lg mb-3 transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-sm cursor-pointer">
      <div className="font-medium text-base mb-2">{title}</div>
      <div className="text-sm text-gray-500">Date added: {date}</div>
      <div className="text-sm text-gray-500">Participant: {participant}</div>
    </div>
  );

  return (
    <MainLayout>
      <div className="text-sm text-gray-500 mb-2">
        Dashboard &gt; <span>ToDoshnik</span>
      </div>

      <h1 className="text-2xl font-medium mb-4">Project name</h1>

      {/* Info boxes */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card p-4 rounded-xl text-sm">
          <p>
            <span className="font-medium">Date added:</span> 12/04/2021
          </p>
          <p>
            <span className="font-medium">Deadline:</span> 24/04/2021
          </p>
          <p>
            <span className="font-medium">Participants:</span> Adyl, Azhar,
            Arthur
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl col-span-2 text-sm">
          Менеджер для внутреннего пользования, предназначенный для учета
          статистики и трекинга задач.
        </div>
        <div className="bg-card p-4 rounded-xl text-sm">
          <p>
            <span className="font-medium">All tasks:</span> 6
          </p>
          <p>
            <span className="font-medium">Done:</span> 0
          </p>
          <p>
            <span className="font-medium">Frozen:</span> 1
          </p>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-4">
        {/* To Do */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">To do</h2>
            <button className="text-btn-green text-xl font-medium cursor-pointer transition-colors duration-200 hover:text-btn-green/80">
              +
            </button>
          </div>
          <TaskCard
            title="CRM system design"
            date="12/04/2021"
            participant="Azhar"
          />
          <TaskCard title="Statistics" date="12/04/2021" participant="Artur" />
          <TaskCard
            title="Priorities"
            date="12/04/2021"
            participant="Adyl, Artur"
          />
        </div>

        {/* In progress */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-4">In progress</h2>
          <TaskCard
            title="Notifications"
            date="12/04/2021"
            participant="Artur"
          />
          <TaskCard title="Task types" date="12/04/2021" participant="Adyl" />
        </div>

        {/* Closed */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-4">Closed</h2>
        </div>

        {/* Frozen */}
        <div className="bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-4">Frozen</h2>
          <TaskCard
            title="Todoshnik design"
            date="12/04/2021"
            participant="Azhar"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Task_Manager;
