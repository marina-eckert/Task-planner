export interface Project {
  title: string;
  dateStart: string;
  dateEnd: string;
  team: string;
}

export interface Task {
  title: string;
  participant: string;
  date: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "in-progress" | "closed" | "frozen";
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  message?: string;
}

export interface HistoryItem {
  title: string;
  activity: string;
  description: string;
  user: string;
}
