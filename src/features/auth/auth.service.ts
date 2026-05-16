import bcrypt from "bcryptjs";
import { userRepo } from "@/features/users/user.repo";
import { LoginInput } from "./auth.types";
import { Session } from "./auth.types";
import { CreateUserInput } from "@/features/users/user.types";

export const authService = {
  register: async (data: CreateUserInput): Promise<Session> => {
    // Check email tồn tại chưa
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error("Email already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Tạo user
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
    // Tìm user theo email
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");

    // Check password
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
