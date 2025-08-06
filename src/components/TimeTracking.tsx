import { useState } from "react";
import type { TimeLog, TimeLogForm } from "../types/index";

interface TimeTrackingProps {
  taskId: number;
  timeLogs: TimeLog[];
  onTimeLogsUpdate: (timeLogs: TimeLog[]) => void;
  t: (key: string) => string;
}

const TimeTracking: React.FC<TimeTrackingProps> = ({
  taskId,
  timeLogs,
  onTimeLogsUpdate,
}) => {
  const [showTimeLogForm, setShowTimeLogForm] = useState(false);
  const [timeLogForm, setTimeLogForm] = useState<TimeLogForm>({
    log_date: new Date().toISOString().split("T")[0],
    hours: "",
    comment: "",
  });

  const handleLogTime = async () => {
    if (!timeLogForm.hours || !timeLogForm.log_date) {
      alert("Please fill in date and hours");
      return;
    }

    try {
      const newLog: TimeLog = {
        id: timeLogs.length + 1,
        task_id: taskId,
        user_id: 1,
        log_date: timeLogForm.log_date,
        hours: parseFloat(timeLogForm.hours),
        comment: timeLogForm.comment,
        created_at: new Date().toISOString(),
      };

      onTimeLogsUpdate([...timeLogs, newLog]);
      setTimeLogForm({
        log_date: new Date().toISOString().split("T")[0],
        hours: "",
        comment: "",
      });
      setShowTimeLogForm(false);
      alert("Time logged successfully! (Demo mode)");
    } catch (err) {
      console.error("Error logging time:", err);
      alert("Error logging time");
    }
  };

  const getTotalHours = () => {
    return timeLogs.reduce((total, log) => total + log.hours, 0).toFixed(1);
  };

  const handleFormChange = (field: keyof TimeLogForm, value: string) => {
    setTimeLogForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-card p-4 rounded-xl mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Time Tracking</h3>
        <button
          onClick={() => setShowTimeLogForm(!showTimeLogForm)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Log Time
        </button>
      </div>

      {/* Time Log Form */}
      {showTimeLogForm && (
        <div className="bg-gray-50 p-3 rounded mb-3">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium mb-1">Date</label>
              <input
                type="date"
                value={timeLogForm.log_date}
                onChange={(e) => handleFormChange("log_date", e.target.value)}
                className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Hours</label>
              <input
                type="number"
                step="0.5"
                value={timeLogForm.hours}
                onChange={(e) => handleFormChange("hours", e.target.value)}
                className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                placeholder="e.g. 2.5"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Comment</label>
            <textarea
              value={timeLogForm.comment}
              onChange={(e) => handleFormChange("comment", e.target.value)}
              className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
              rows={2}
              placeholder="What did you work on?"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLogTime}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Save Time Log
            </button>
            <button
              onClick={() => setShowTimeLogForm(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Time Logs List */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-sm">
            Logged Hours: {getTotalHours()}h
          </h4>
        </div>
        {timeLogs.map((log) => (
          <div
            key={log.id}
            className="flex justify-between items-start bg-gray-50 p-2 rounded text-sm"
          >
            <div className="flex-1">
              <div className="font-medium">{log.log_date}</div>
              <div className="text-gray-600">{log.comment}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">{log.hours}h</div>
              <div className="text-xs text-gray-500">
                {new Date(log.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTracking;
