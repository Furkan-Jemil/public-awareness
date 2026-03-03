import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "critical" | "warning" | "info" | "success" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variants = {
    critical: "bg-red-500 text-white",
    warning: "bg-orange-500 text-white",
    info: "bg-blue-500 text-white",
    success: "bg-emerald-500 text-white",
    neutral: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
