export interface Project {
  id: number;
  name: string;
  description?: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  team: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  participant: string;
  date: string;
  due_date: string;
  created_at: string;
  updated_at?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done" | "frozen";
  estimated_hours?: number;
  assignees: number[];
  project_id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user" | "manager";
  created_at?: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  role: string;
  message?: string;
}

export interface HistoryItem {
  title: string;
  activity: string;
  description: string;
  user: string;
}

export interface Comment {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
  author?: string;
  created_at: string;
  updated_at?: string;
}

export interface TimeLog {
  id: number;
  task_id: number;
  user_id: number;
  log_date: string;
  hours: number;
  comment: string;
  created_at: string;
}

export interface TaskEditForm {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string;
  assignees: number[];
}

export interface TimeLogForm {
  log_date: string;
  hours: string;
  comment: string;
}

export interface ProjectInfoData {
  start: string;
  end: string;
  team: string;
  customDescription: string;
}

export interface TaskStatistics {
  total: number;
  done: number;
  inProgress: number;
  frozen: number;
  todo: number;
}

export type TaskStatus = Task["status"];
export type TaskPriority = Task["priority"];
