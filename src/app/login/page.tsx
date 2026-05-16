"use client";

import { useActionState } from "react";
import { loginAction, AuthState } from "@/actions/auth.action";
import Link from "next/link";

const initialState: AuthState = {};

export default function Page() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
          <span className="text-white font-semibold text-lg">TaskFlow</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage your tasks
            <br />
            with ease.
          </h2>
          <p className="text-blue-200 text-lg">
            Stay organized, focused, and in control of your work every day.
          </p>
        </div>
        <p className="text-blue-300 text-sm">
          © 2024 TaskFlow. All rights reserved.
        </p>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {state.message && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {state.message}
            </div>
          )}

          <form action={formAction} className="flex flex-col gap-4">
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
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
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
