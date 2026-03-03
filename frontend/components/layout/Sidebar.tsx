"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Bell, 
  FileText, 
  Bookmark, 
  ShieldCheck,
  Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PlusCircle, label: "Create Report", href: "/dashboard/create-report" },
  { icon: Bell, label: "Subscriptions", href: "/dashboard/subscriptions" },
  { icon: FileText, label: "My Reports", href: "/dashboard/my-reports" },
  { icon: Bookmark, label: "Saved Reports", href: "/dashboard/saved-reports" },
  { icon: ShieldCheck, label: "Admin", href: "/dashboard/admin" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Landmark className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-primary tracking-tight">CivicAlerts</span>
      </div>

      <div className="px-4 py-2">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest px-4 mb-4">Main Menu</p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link
                 key={item.href}
                 href={item.href}
                 className={cn(
                   "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                   isActive 
                    ? "bg-blue-50 text-primary" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                 )}
               >
                 <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400")} />
                 {item.label}
               </Link>
             );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50/50">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
             <p className="text-sm font-bold text-gray-900 truncate">Alex Johnson</p>
             <p className="text-[10px] text-gray-500 font-medium">Safety Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
