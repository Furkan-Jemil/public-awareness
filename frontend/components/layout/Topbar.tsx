"use client";

import { Search, Bell, Settings, ChevronDown, MapPin } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-gray-700">San Francisco, CA</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="w-[400px]">
          <Input 
            placeholder="Search alerts or locations..." 
            icon={<Search className="w-4 h-4" />}
            className="bg-gray-50 border-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
