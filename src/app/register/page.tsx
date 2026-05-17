"use client";

import { useActionState, useState } from "react";
import { registerAction, AuthState } from "@/actions/auth.action";
import Link from "next/link";

const initialState: AuthState = {};

function getPasswordStrength(password: string) {
  if (password.length === 0) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
  if (score === 2)
    return { label: "Fair", color: "bg-yellow-400", width: "w-2/4" };
  if (score === 3)
    return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
  return { label: "Strong", color: "bg-green-500", width: "w-full" };
}

export default function Page() {
  const [state, formAction] = useActionState(registerAction, initialState);
  const [password, setPassword] = useState("");
  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
          <span className="text-white font-semibold text-lg">TaskFlow</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Start organizing
            <br />
            your work today.
          </h2>
          <p className="text-blue-200 text-lg">
            Join thousands of people who use TaskFlow to get things done.
          </p>
        </div>
        <p className="text-blue-300 text-sm">
          © 2024 TaskFlow. All rights reserved.
        </p>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign up to get started for free
            </p>
          </div>

          {state.message && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {state.message}
            </div>
          )}

          <form action={formAction} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {state.errors?.name && (
                <p className="text-xs text-red-500">{state.errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {state.errors?.email && (
                <p className="text-xs text-red-500">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {/* Password strength bar */}
              {strength && (
                <div className="mt-1">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-400">
                      Min 8 chars, uppercase, number, symbol
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        strength.label === "Weak"
                          ? "text-red-500"
                          : strength.label === "Fair"
                            ? "text-yellow-500"
                            : strength.label === "Good"
                              ? "text-blue-500"
                              : "text-green-500"
                      }`}
                    >
                      {strength.label}
                    </p>
                  </div>
                </div>
              )}
              {state.errors?.password && (
                <p className="text-xs text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl text-sm transition-colors mt-1"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
