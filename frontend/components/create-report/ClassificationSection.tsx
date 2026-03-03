"use client";

import { useState } from "react";
import { Layers, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const CATEGORIES = ["General Safety", "Infrastructure", "Utilities", "Transportation", "Environmental", "Business Conditions"];
const CITIES = ["New York", "San Francisco", "Los Angeles", "Chicago", "London"];
const AREAS: Record<string, string[]> = {
  "New York": ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"],
  "San Francisco": ["Downtown", "SoMa", "Mission", "Castro", "Richmond"],
  "Los Angeles": ["Hollywood", "Venice", "Downtown", "Koreatown", "Westwood"],
  "Chicago": ["Loop", "Lincoln Park", "Wicker Park", "Hyde Park", "River North"],
  "London": ["City of London", "Westminster", "Shoreditch", "Canary Wharf", "Camden"],
};

const URGENCY_LEVELS = [
  { label: "Low", dot: "bg-emerald-500", ring: "ring-emerald-400/30", active: "bg-emerald-50 border-emerald-200 text-emerald-700", text: "text-emerald-700" },
  { label: "Medium", dot: "bg-orange-500", ring: "ring-orange-400/30", active: "bg-orange-50 border-orange-200 text-orange-700", text: "text-orange-700" },
  { label: "Critical", dot: "bg-red-500", ring: "ring-red-400/30", active: "bg-red-50 border-red-200 text-red-700", text: "text-red-700" },
];

function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          {value}
          <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
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
    </div>
  );
}

export function ClassificationSection() {
  const [category, setCategory] = useState("General Safety");
  const [urgency, setUrgency] = useState("Low");
  const [city, setCity] = useState("New York");
  const [area, setArea] = useState("Manhattan");

  const handleCityChange = (c: string) => {
    setCity(c);
    setArea(AREAS[c]?.[0] ?? "");
  };

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 border-b border-gray-50 pb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
          <Layers className="w-4 h-4 text-indigo-600" />
        </div>
        <CardTitle className="text-lg font-bold">Classification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <SelectField label="Category" options={CATEGORIES} value={category} onChange={setCategory} />

        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700">Urgency Level</label>
          <div className="grid grid-cols-3 gap-3">
            {URGENCY_LEVELS.map((level) => {
              const isSelected = urgency === level.label;
              return (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => setUrgency(level.label)}
                  className={cn(
                    "flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all gap-2",
                    isSelected
                      ? cn(level.active, "ring-2", level.ring, "shadow-sm")
                      : "bg-white border-gray-100 hover:bg-gray-50"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full", level.dot)} />
                  <span className={cn("text-[10px] font-extrabold uppercase tracking-widest", isSelected ? level.text : "text-gray-500")}>
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField label="City" options={CITIES} value={city} onChange={handleCityChange} />
          <SelectField label="Area / District" options={AREAS[city] ?? []} value={area} onChange={setArea} />
        </div>
      </CardContent>
    </Card>
  );
}
