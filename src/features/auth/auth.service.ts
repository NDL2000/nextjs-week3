import bcrypt from "bcryptjs";
import { userRepo } from "@/features/users/user.repo";
import { LoginInput } from "./auth.types";
import { Session } from "./auth.types";
import { CreateUserInput } from "@/features/users/user.types";

function validatePasswordStrength(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must contain at least one special character";
  return null;
}

export const authService = {
  register: async (data: CreateUserInput): Promise<Session> => {
    // Check password strength
    const passwordError = validatePasswordStrength(data.password);
    if (passwordError) throw new Error(passwordError);

    // Check email existence
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error("Email already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  login: async (data: LoginInput): Promise<Session> => {
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
