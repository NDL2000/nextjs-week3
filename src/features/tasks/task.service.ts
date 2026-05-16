import { z } from "zod";
import { taskRepo } from "./task.repo";
import { CreateTaskInput, UpdateTaskInput, Task } from "./task.types";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]),
  user_id: z.string().min(1),
});

export const updateTaskSchema = taskSchema.partial().omit({ user_id: true });

export class ValidationError extends Error {
  errors: { path: string[]; message: string }[];

  constructor(errors: { path: string[]; message: string }[]) {
    super("Validation failed");
    this.errors = errors;
  }
}

export const taskService = {
  getAllForStats: async (userId: string): Promise<Task[]> => {
    return await taskRepo.findAllForStats(userId);
  },
  
  getAll: async (
    userId: string,
    page: number = 1,
  ): Promise<{ data: Task[]; count: number }> => {
    return await taskRepo.findAll(userId, page);
  },

  getById: async (id: string): Promise<Task> => {
    const task = await taskRepo.findById(id);
    if (!task) throw new Error("Task not found");
    return task;
  },

  create: async (data: CreateTaskInput): Promise<Task> => {
    const result = taskSchema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((e) => ({
          path: e.path.map(String),
          message: e.message,
        })),
      );
    }
    return await taskRepo.create(result.data);
  },

  update: async (id: string, data: UpdateTaskInput): Promise<Task> => {
    await taskService.getById(id);
    const result = updateTaskSchema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((e) => ({
          path: e.path.map(String),
          message: e.message,
        })),
      );
    }
    return await taskRepo.update(id, result.data);
  },

  delete: async (id: string): Promise<void> => {
    await taskService.getById(id);
    await taskRepo.delete(id);
  },
};
