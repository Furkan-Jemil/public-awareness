import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface HistoryEvent {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  color?: "primary" | "emerald" | "gray";
}

interface ValidationHistoryProps {
  events: HistoryEvent[];
}

export function ValidationHistory({ events }: ValidationHistoryProps) {
  const colorMap = {
    primary: "bg-primary",
    emerald: "bg-emerald-500",
    gray: "bg-gray-300",
  };

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">Validation History</h2>
        <div className="relative pl-4">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100 rounded-full" />
          <div className="space-y-5">
            {events.map((event, i) => {
              const dot = colorMap[event.color ?? "gray"];
              return (
                <div key={event.id} className="flex items-start gap-4 relative">
                  <div className={cn("w-3 h-3 rounded-full mt-1 shrink-0 z-10 ring-2 ring-white", dot)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.time} · {event.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
