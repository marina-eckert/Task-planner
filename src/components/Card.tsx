import { Users, Calendar, Upload } from "lucide-react";

// TODO: Создать интерфейс Project в src/types/index.ts
// interface Project {
//   title: string;
//   dateStart: string;
//   dateEnd: string;
//   team: string;
// }
const projects = [
  {
    title: "OcOO “Energi.kg”",
    dateStart: "12/04/2021",
    dateEnd: "12/04/2021",
    team: "Adyl, Azhar, Arthur",
  },
  {
    title: "TextLab",
    dateStart: "12/04/2021",
    dateEnd: "12/04/2021",
    team: "Adyl, Azhar, Arthur",
  },
  {
    title: "ComLab",
    dateStart: "12/04/2021",
    dateEnd: "12/04/2021",
    team: "Adyl, Azhar, Arthur",
  },
  {
    title: "ComLab",
    dateStart: "12/04/2021",
    dateEnd: "12/04/2021",
    team: "Adyl, Azhar, Arthur",
  },
  {
    title: "ComLab",
    dateStart: "12/04/2021",
    dateEnd: "12/04/2021",
    team: "Adyl, Azhar, Arthur",
  },
];

// TODO: Добавить типизацию компонента - const Card: React.FC = () => {
const Card = () => {
  return (
    <div className="bg-card p-6 rounded-xl max-w-8xl mt-6 font-rubik font-normal">
      <div className="flex justify-between">
        <h2 className="text-2xl">Projects</h2>
        <button className="text-sm flex items-center text-gray-700 hover:text-black">
          <Upload size={16} className="mr-1" />
          Export
        </button>
      </div>

      <div className="bg-project flex justify-between items-center mb-4"></div>

      <div className="flex flex-col space-y-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 bg-project rounded-xl transition-transform duration-300 ease-in-out hover:scale-103 hover:shadow-md cursor-pointer"
          >
            <div className="text-sm font-medium">{project.title}</div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {project.dateStart}
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {project.dateEnd}
              </div>
              <div className="flex items-center">
                <Users size={14} className="mr-1" />
                {project.team}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
