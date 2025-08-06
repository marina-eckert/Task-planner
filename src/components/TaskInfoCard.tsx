import type {
  Task,
  User,
  TaskEditForm,
  TaskPriority,
  TaskStatus,
} from "../types/index";

interface TaskInfoCardProps {
  task: Task;
  users: User[];
  isEditing: boolean;
  editForm: TaskEditForm;
  onFormChange: (form: TaskEditForm) => void;
  t: (key: string) => string;
}

const TaskInfoCard: React.FC<TaskInfoCardProps> = ({
  task,
  users,
  isEditing,
  editForm,
  onFormChange,
  t,
}) => {
  const getAssigneeNames = (assigneeIds: number[]) => {
    if (!assigneeIds || assigneeIds.length === 0) return "Not assigned";
    const names = assigneeIds
      .map((id) => users.find((user) => user.id === id)?.username)
      .filter(Boolean);

    if (names.length === 0) return "Not assigned";
    return names.join(", ");
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-400 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const handleInputChange = (
    field: keyof TaskEditForm,
    value: string | number[],
  ) => {
    onFormChange({
      ...editForm,
      [field]: value,
    });
  };

  const handleAssigneeChange = (userId: number, isChecked: boolean) => {
    const newAssignees = isChecked
      ? [...editForm.assignees, userId]
      : editForm.assignees.filter((id) => id !== userId);

    handleInputChange("assignees", newAssignees);
  };

  return (
    <div className="bg-card p-4 rounded-xl text-sm space-y-1 mb-4">
      <p>
        <span className="font-medium">{t("priority")}:</span>{" "}
        {isEditing ? (
          <select
            value={editForm.priority}
            onChange={(e) =>
              handleInputChange("priority", e.target.value as TaskPriority)
            }
            className="border border-gray-300 px-2 py-1 rounded text-xs"
          >
            <option value="low">{t("low")}</option>
            <option value="medium">{t("medium")}</option>
            <option value="high">{t("high")}</option>
          </select>
        ) : (
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(task.priority)}`}
          >
            {t(task.priority)}
          </span>
        )}
      </p>
      <p>
        <span className="font-medium">{t("status")}:</span>{" "}
        {isEditing ? (
          <select
            value={editForm.status}
            onChange={(e) =>
              handleInputChange("status", e.target.value as TaskStatus)
            }
            className="border border-gray-300 px-2 py-1 rounded text-xs"
          >
            <option value="todo">{t("todo")}</option>
            <option value="in_progress">{t("in_progress")}</option>
            <option value="done">{t("done")}</option>
            <option value="frozen">{t("frozen")}</option>
          </select>
        ) : (
          t(task.status)
        )}
      </p>
      <p>
        <span className="font-medium">{t("added_date")}:</span>{" "}
        {new Date(task.created_at).toLocaleDateString()}
      </p>
      <p>
        <span className="font-medium">{t("deadline")}:</span>{" "}
        {isEditing ? (
          <input
            type="date"
            value={editForm.due_date}
            onChange={(e) => handleInputChange("due_date", e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded text-xs"
          />
        ) : task.due_date ? (
          new Date(task.due_date).toLocaleDateString()
        ) : (
          t("no_deadline")
        )}
      </p>
      <div>
        <span className="font-medium">{t("participants")}:</span>{" "}
        {isEditing ? (
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto border border-gray-200 rounded p-2">
            {users.map((user) => (
              <label
                key={user.id}
                className="flex items-center space-x-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={editForm.assignees.includes(user.id)}
                  onChange={(e) =>
                    handleAssigneeChange(user.id, e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <span>{user.username}</span>
              </label>
            ))}
            {editForm.assignees.length > 0 && (
              <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                {t("selected") || "Selected"}: {editForm.assignees.length}
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs mt-1">
            {getAssigneeNames(task.assignees)}
            {task.assignees && task.assignees.length > 0 && (
              <div className="text-gray-500 mt-1">
                ({task.assignees.length}{" "}
                {task.assignees.length === 1 ? "participant" : "participants"})
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInfoCard;
