interface TaskActionButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  t: (key: string) => string;
}

const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  t,
}) => {
  if (!isEditing) {
    return (
      <>
        <button
          onClick={onEdit}
          className="w-full bg-btn-green text-white rounded-xl p-2 text-sm font-medium p-4 cursor-pointer mb-4 transition-colors duration-300 ease-in-out hover:bg-green-600"
        >
          {t("edit") || "Edit"}
        </button>
        <button
          onClick={onDelete}
          className="w-full bg-btn-red text-white rounded-xl p-2 text-sm font-medium p-4 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-600"
        >
          {t("delete") || "Delete"}
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={onSave}
        className="w-full bg-btn-green text-white rounded-xl p-2 text-sm font-medium p-4 cursor-pointer mb-4 transition-colors duration-300 ease-in-out hover:bg-green-600"
      >
        {t("save") || "Save"}
      </button>
      <button
        onClick={onCancel}
        className="w-full bg-btn-orange text-white rounded-xl p-2 text-sm font-medium p-4 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-fusion"
      >
        {t("cancel") || "Cancel"}
      </button>
    </>
  );
};

export default TaskActionButtons;
