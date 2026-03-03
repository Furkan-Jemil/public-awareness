"use client";

import { ShieldCheck } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      <p className="text-gray-500 mt-2 max-w-sm">
        Authorized administrative controls and moderation tools for the CivicAlerts platform.
      </p>
    </div>
  );
}
