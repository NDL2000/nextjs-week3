"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { taskService } from "@/features/tasks/task.service";
import { getSession } from "@/lib/session";

export type TaskState = {
  errors?: {
    title?: string[];
    description?: string[];
    status?: string[];
  };
  message?: string;
};

export async function createTaskAction(
  prevState: TaskState,
  formData: FormData,
): Promise<TaskState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as "todo" | "in_progress" | "done",
    user_id: session.id,
  };

  try {
    await taskService.create(data);
  } catch (error: any) {
    if (error?.errors) {
      const fieldErrors: Record<string, string[]> = {};
      for (const err of error.errors) {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(err.message);
      }
      return { errors: fieldErrors as TaskState["errors"] };
    }
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateTaskAction(
  id: string,
  prevState: TaskState,
  formData: FormData,
): Promise<TaskState> {
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as "todo" | "in_progress" | "done",
  };

  try {
    await taskService.update(id, data);
  } catch (error: any) {
    if (error?.errors) {
      const fieldErrors: Record<string, string[]> = {};
      for (const err of error.errors) {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(err.message);
      }
      return { errors: fieldErrors as TaskState["errors"] };
    }
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteTaskAction(id: string): Promise<void> {
  await taskService.delete(id);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateTaskStatusAction(
  id: string,
  status: "todo" | "in_progress" | "done",
): Promise<void> {
  await taskService.update(id, { status });
  revalidatePath("/dashboard");
}
