import { Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function BasicInfoSection() {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 border-b border-gray-50 pb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Info className="w-4 h-4 text-primary" />
        </div>
        <CardTitle className="text-lg font-bold">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Report Title</label>
          <Input placeholder="e.g., Infrastructure damage at Sector 4" className="bg-gray-50/50 border-gray-100" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Description</label>
          <textarea 
            placeholder="Detailed account of the situation..." 
            className="flex min-h-[140px] w-full rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
