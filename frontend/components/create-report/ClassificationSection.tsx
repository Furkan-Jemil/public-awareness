import { Layers, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function ClassificationSection() {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 border-b border-gray-50 pb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
          <Layers className="w-4 h-4 text-indigo-600" />
        </div>
        <CardTitle className="text-lg font-bold">Classification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Category</label>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10">
              <option>General Safety</option>
              <option>Infrastructure</option>
              <option>Utilities</option>
              <option>Transportation</option>
              <option>Environmental</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700">Urgency Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Low", color: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-100", bg: "bg-emerald-50/50" },
              { label: "Medium", color: "bg-orange-500", text: "text-orange-600", border: "border-orange-100", bg: "bg-orange-50/50" },
              { label: "Critical", color: "bg-red-500", text: "text-red-600", border: "border-red-100", bg: "bg-red-50/50" }
            ].map((level, i) => (
              <button 
                key={level.label}
                type="button"
                className={cn(
                  "flex flex-col items-center justify-center py-4 rounded-xl border transition-all gap-2",
                  i === 0 ? cn(level.bg, level.border, "ring-2 ring-emerald-500/20 shadow-sm") : "bg-white border-gray-100 hover:bg-gray-50"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", level.color)} />
                <span className={cn("text-[10px] font-extrabold uppercase tracking-widest", level.text)}>{level.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">City</label>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10">
                <option>New York</option>
                <option>San Francisco</option>
                <option>London</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Area / District</label>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10">
                <option>Manhattan</option>
                <option>Brooklyn</option>
                <option>Queens</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
