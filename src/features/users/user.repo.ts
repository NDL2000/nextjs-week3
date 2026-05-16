import { supabase } from "@/lib/supabase";
import { User, CreateUserInput } from "./user.types";

export const userRepo = {
  findAll: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  findById: async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  findByEmail: async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return null;
    return data;
  },

  create: async (data: CreateUserInput): Promise<User> => {
    const { data: user, error } = await supabase
      .from("users")
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return user;
  },
};
