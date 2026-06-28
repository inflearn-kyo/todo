export type Priority = "high" | "normal" | "low";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority?: Priority;
}

export type Filter = "all" | "active" | "completed";

export type Sort = "created" | "dueDate" | "priority";
