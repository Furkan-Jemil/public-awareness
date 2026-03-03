import { Map as MapIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function MapLocationSection() {
  return (
    <Card className="border-gray-100 shadow-sm mt-6">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <MapIcon className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-bold">Map Location</CardTitle>
        </div>
        <button className="text-xs font-bold text-primary hover:underline">Pin on Map</button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative aspect-video bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
            alt="Map Preview" 
            className="w-full h-full object-cover grayscale opacity-60" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40 animate-pulse">
               <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
