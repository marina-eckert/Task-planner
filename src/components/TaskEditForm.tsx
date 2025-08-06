import type { TaskEditForm as TaskEditFormType } from "../types/index";

interface TaskEditFormProps {
  editForm: TaskEditFormType;
  onFormChange: (form: TaskEditFormType) => void;
  t: (key: string) => string;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
  editForm,
  onFormChange,
}) => {
  const handleInputChange = (
    field: keyof TaskEditFormType,
    value: string | number[],
  ) => {
    onFormChange({
      ...editForm,
      [field]: value,
    });
  };

  return (
    <input
      type="text"
      value={editForm.title}
      onChange={(e) => handleInputChange("title", e.target.value)}
      className="text-2xl font-medium mb-4 w-full border border-gray-300 px-3 py-2 rounded"
    />
  );
};

export default TaskEditForm;
