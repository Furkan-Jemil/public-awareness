"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const areas = ["All Areas", "Downtown", "Suburbs", "Industrial"];

export function FilterBar() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Local Alerts</h1>
        <div className="flex bg-gray-100/50 p-1 rounded-xl border border-gray-100">
          {areas.map((area, i) => (
            <button
              key={area}
              className={cn(
                "px-5 py-2 text-sm font-bold rounded-lg transition-all",
                i === 0 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
             <span className="text-gray-400 font-medium">Category:</span> All
             <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
             <span className="text-gray-400 font-medium">Urgency:</span> All
             <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
             <span className="text-gray-400 font-medium">Sort:</span> Newest
             <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <p className="text-xs text-gray-400 italic font-medium">
          Showing 42 active alerts
        </p>
      </div>
    </div>
  );
}
