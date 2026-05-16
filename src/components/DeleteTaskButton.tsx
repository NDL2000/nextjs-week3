"use client";

import { deleteTaskAction } from "@/actions/task.action";
import { useState } from "react";

export default function DeleteTaskButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    await deleteTaskAction(id);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
