"use server";

import { redirect } from "next/navigation";
import { authService } from "@/features/auth/auth.service";
import { setSession, clearSession } from "@/lib/session";

export type AuthState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function loginAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const session = await authService.login(data);
    await setSession(session);
  } catch (error: any) {
    return { message: error.message };
  }

  redirect("/dashboard");
}

export async function registerAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const session = await authService.register(data);
    await setSession(session);
  } catch (error: any) {
    return { message: error.message };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/login");
}
