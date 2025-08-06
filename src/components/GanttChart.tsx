import type { Task, User, TaskStatus, TaskPriority } from "../types/index";

interface GanttChartProps {
  tasks: Task[];
  users: User[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, users }) => {
  const getAssigneeNames = (assigneeIds: number[]) => {
    if (!assigneeIds || assigneeIds.length === 0) return "Not assigned";
    const names = assigneeIds
      .map((id) => users.find((user) => user.id === id)?.username)
      .filter(Boolean);

    if (names.length === 0) return "Not assigned";
    if (names.length > 2) {
      return `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
    }
    return names.join(", ");
  };

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case "todo":
        return "bg-gray-400";
      case "in_progress":
        return "bg-blue-500";
      case "done":
        return "bg-green-500";
      case "frozen":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const tasksWithDates = tasks.filter((task) => task.due_date);

  if (tasksWithDates.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 text-center text-gray-500">
        <p>No tasks with due dates to display in Gantt chart</p>
      </div>
    );
  }

  const dates = tasksWithDates.map((task) => new Date(task.due_date).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const startDate = new Date(minDate);
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date(maxDate);
  endDate.setDate(endDate.getDate() + 7);

  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const timelineHeaders = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    timelineHeaders.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }

  const getTaskBarStyle = (task: Task): { left: string; width: string } => {
    const dueDate = new Date(task.due_date);
    const createdDate = new Date(task.created_at);

    const taskStart = createdDate > startDate ? createdDate : startDate;
    const taskEnd = dueDate;

    const startOffset = Math.max(
      0,
      (taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const duration = Math.max(
      1,
      (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24),
    );

    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;

    return {
      left: `${leftPercent}%`,
      width: `${Math.max(widthPercent, 2)}%`,
    };
  };

  return (
    <div className="bg-card rounded-xl p-6 overflow-x-auto">
      <h3 className="text-lg font-medium mb-4">Project Timeline</h3>

      {/* Timeline Header */}
      <div className="min-w-[800px]">
        <div className="flex border-b border-gray-200 pb-2 mb-4">
          <div className="w-64 flex-shrink-0 font-medium text-sm text-gray-600">
            Task
          </div>
          <div className="flex-1 relative">
            <div className="flex justify-between text-xs text-gray-500">
              {timelineHeaders.map((date, index) => (
                <div key={index} className="flex-1 text-center">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Rows */}
        <div className="space-y-3">
          {tasksWithDates.map((task) => (
            <div key={task.id} className="flex items-center">
              {/* Task Info */}
              <div
                className={`w-64 flex-shrink-0 p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} bg-white`}
              >
                <div
                  className="font-medium text-sm truncate"
                  title={task.title}
                >
                  {task.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getAssigneeNames(task.assignees)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${getStatusColor(task.status)}`}
                  ></span>
                  <span className="text-xs text-gray-600 capitalize">
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Timeline Bar */}
              <div className="flex-1 relative h-8 ml-4">
                <div className="absolute inset-0 border-t border-gray-200"></div>
                <div
                  className={`absolute top-1 h-6 rounded ${getStatusColor(task.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                  style={getTaskBarStyle(task)}
                  title={`${task.title} - Due: ${new Date(task.due_date).toLocaleDateString()}`}
                >
                  <div className="px-2 py-1 text-xs text-white font-medium truncate">
                    {task.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-400"></span>
              <span>To Do</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500"></span>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-500"></span>
              <span>Done</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-400"></span>
              <span>Frozen</span>
            </div>
            <div className="ml-4 flex items-center gap-1">
              <span className="w-3 h-1 border-l-4 border-l-red-500 bg-gray-100"></span>
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-1 border-l-4 border-l-yellow-500 bg-gray-100"></span>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-1 border-l-4 border-l-green-500 bg-gray-100"></span>
              <span>Low Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
