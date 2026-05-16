export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  user_id: string;
  created_at: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  status: TaskStatus;
  user_id: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};
