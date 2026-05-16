import { supabase } from "@/lib/supabase";
import { Task, CreateTaskInput, UpdateTaskInput } from "./task.types";

const PAGE_SIZE = 5;

export const taskRepo = {
  findAllForStats: async (userId: string): Promise<Task[]> => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data ?? [];
  },
  
  findAll: async (
    userId: string,
    page: number = 1,
  ): Promise<{ data: Task[]; count: number }> => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("tasks")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);
    return { data: data ?? [], count: count ?? 0 };
  },

  findById: async (id: string): Promise<Task | null> => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  create: async (data: CreateTaskInput): Promise<Task> => {
    const { data: task, error } = await supabase
      .from("tasks")
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return task;
  },

  update: async (id: string, data: UpdateTaskInput): Promise<Task> => {
    const { data: task, error } = await supabase
      .from("tasks")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return task;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw new Error(error.message);
  },
};
