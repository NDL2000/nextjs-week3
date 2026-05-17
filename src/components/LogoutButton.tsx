"use client";

import { logoutAction } from "@/actions/auth.action";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logoutAction();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed text-gray-700 transition-colors flex items-center gap-2"
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
