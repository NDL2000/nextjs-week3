"use client";

import { useActionState } from "react";
import { updateTaskAction, TaskState } from "@/actions/task.action";
import { Task } from "@/features/tasks/task.types";
import Link from "next/link";

const initialState: TaskState = {};

export default function EditTaskForm({ task }: { task: Task }) {
  const [state, formAction] = useActionState(
    updateTaskAction.bind(null, task.id),
    initialState,
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-sm text-gray-500 mt-1">Update your task details</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {state.message && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {state.message}
            </div>
          )}

          <form action={formAction} className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                type="text"
                placeholder="Enter task title"
                defaultValue={task.title}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {state.errors?.title && (
                <p className="text-xs text-red-500">{state.errors.title[0]}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Description{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="description"
                placeholder="Add a description..."
                defaultValue={task.description ?? ""}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                defaultValue={task.status}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl text-sm transition-colors"
              >
                Save Changes
              </button>
              <Link
                href="/dashboard"
                className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
