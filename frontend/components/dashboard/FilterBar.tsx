"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const AREAS = ["All Areas", "Downtown", "Suburbs", "Industrial"];
const CATEGORIES = ["All", "Infrastructure", "Transportation", "Utilities", "Safety", "Environmental", "Public Service"];
const URGENCIES = ["All", "Info", "Warning", "Critical"];
const SORTS = ["Newest", "Oldest", "Most Urgent", "Most Validated"];

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}

function Dropdown({ label, options, value, onChange, icon }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <span className="text-gray-400 font-medium">{label}:</span>
        {value}
        {icon ?? <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-30 min-w-[160px] py-1 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                opt === value ? "bg-blue-50 text-primary font-bold" : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function FilterBar() {
  const [activeArea, setActiveArea] = useState("All Areas");
  const [category, setCategory] = useState("All");
  const [urgency, setUrgency] = useState("All");
  const [sort, setSort] = useState("Newest");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Local Alerts</h1>
        <div className="flex bg-gray-100/50 p-1 rounded-xl border border-gray-100">
          {AREAS.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => setActiveArea(area)}
              className={cn(
                "px-5 py-2 text-sm font-bold rounded-lg transition-all",
                activeArea === area
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Dropdown label="Category" options={CATEGORIES} value={category} onChange={setCategory} />
          <Dropdown label="Urgency" options={URGENCIES} value={urgency} onChange={setUrgency} />
          <Dropdown
            label="Sort"
            options={SORTS}
            value={sort}
            onChange={setSort}
            icon={<SlidersHorizontal className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <p className="text-xs text-gray-400 italic font-medium">Showing 42 active alerts</p>
      </div>
    </div>
  );
}
