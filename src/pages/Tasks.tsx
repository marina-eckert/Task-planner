import MainLayout from "../layouts/MainLayout";
import HistoryCard from "../components/HistoryCard";
import avatar from "../assets/images/arthur.svg";

// TODO: Добавить типизацию компонента - const Tasks: React.FC = () => {
const Tasks = () => {
  return (
    <MainLayout>
      <div className="text-sm text-gray-500 mb-2">
        Dashboard &gt; <span>ToDoshnik</span> &gt; <span>Project name</span>
      </div>

      <h1 className="text-2xl font-medium mb-4">Task name</h1>

      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
        {/* Left column*/}
        <div className="col-span-1 bg-card rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <h2 className="font-medium mb-6">History</h2>

          <HistoryCard
            title="CRM system design"
            activity="12/04/2021, 6:37 p.m"
            description="Приступил(-а) к задаче"
            user="Azhar"
          />
          <HistoryCard
            title="Notifications"
            activity="12/04/2021, 6:37 p.m"
            description="Добавил(-а) комментарий"
            user="Azhar"
          />
          <HistoryCard
            title="Energy.kg"
            activity="12/04/2021, 6:37 p.m"
            description="Создал(-а) проект"
            user="Azhar"
          />
          <HistoryCard
            title="CRM system design"
            activity="12/04/2021, 6:37 p.m"
            description="Изменил(-а) участников задачи"
            user="Azhar"
          />
        </div>

        {/* Middle column*/}
        <div className="col-span-1">
          <div className="bg-card p-4 rounded-xl mb-4 text-sm leading-relaxed">
            Добавить статистику по задачам, часам. <br />
            Сделать сбор статистики за текущий месяц и создание уведомления в
            последний день месяца.
          </div>

          <div className="bg-card p-4 rounded-xl h-50">
            <textarea
              className="bg-project w-full rounded-xl p-3 text-sm mb-2 resize-none focus:outline-none h-28"
              placeholder="Комментарий..."
              rows={3}
              // TODO: Добавить типизированный обработчик событий
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {...}}
            ></textarea>

            <button className="bg-btn-orange text-white rounded-xl px-4 py-2 text-sm font-medium float-right cursor-pointer transition-colors duration-300 ease-in-out hover:brightness-110">
              Опубликовать
            </button>
          </div>

          <div className="clear-both mt-4 text-sm bg-card p-4 rounded-xl mb-4">
            <div className="flex items-start gap-3">
              <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              <div>
                <div className="text-xs font-medium text-black mb-1">
                  Artur{" "}
                  <span className="text-gray-400 ml-2">
                    12/04/2021, 6:37 p.m
                  </span>
                </div>
                <p>
                  1. Добавлены шаблонные теги для подсчёта часов, потраченных на
                  закрытые задачи.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column*/}
        <div className="col-span-1 space-y-2">
          <div className="bg-card p-4 rounded-xl text-sm space-y-1 mb-4">
            <p>
              <span className="font-medium">Priority:</span>{" "}
              <span className="bg-btn-green text-white px-2 py-0.5 rounded-full text-xs">
                Low
              </span>
            </p>
            <p>
              <span className="font-medium">Status:</span> Frozen
            </p>
            <p>
              <span className="font-medium">Date added:</span> 12/04/2021
            </p>
            <p>
              <span className="font-medium">Deadline:</span> 21/04/2021
            </p>
            <p>
              <span className="font-medium">Participants:</span> Adyl, Azhar,
              Arthur
            </p>
          </div>

          <select className="w-full appearance-none bg-card rounded-xl p-2 text-sm text-center p-4 focus:outline-none cursor-pointer mb-4">
            <option>Change the priority</option>
          </select>

          <select className="w-full appearance-none bg-card rounded-xl p-2 text-sm text-center p-4 focus:outline-none cursor-pointer mb-4">
            <option>Change the task type</option>
          </select>

          <button className="w-full bg-btn-green text-white rounded-xl p-2 text-sm font-medium p-4 cursor-pointer mb-4 transition-colors duration-300 ease-in hover:brightness-110">
            Become a participant
          </button>

          <button className="w-full bg-btn-blue text-black rounded-xl p-2 text-sm font-medium p-4 cursor-pointer mb-4 transition-colors duration-300 ease-in hover:brightness-110">
            ❄️ Freeze the task
          </button>

          <button className="w-full bg-btn-red text-white rounded-xl p-2 text-sm font-medium p-4 cursor-pointer transition-colors duration-300 ease-in hover:brightness-110">
            ✓ Close task
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tasks;
