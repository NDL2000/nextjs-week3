import { cookies } from "next/headers";
import { Session } from "@/features/auth/auth.types";

const SESSION_KEY = "session";
const SECRET = process.env.SESSION_SECRET!;

export async function setSession(session: Session): Promise<void> {
  const cookieStore = await cookies();
  const value = Buffer.from(JSON.stringify(session)).toString("base64");
  cookieStore.set(SESSION_KEY, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 ngày
    path: "/",
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_KEY);
  if (!cookie) return null;

  try {
    const decoded = Buffer.from(cookie.value, "base64").toString("utf-8");
    return JSON.parse(decoded) as Session;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
