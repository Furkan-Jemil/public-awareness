"use client";

import { useRouter } from "next/navigation";
import { MapPin, Clock, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export interface AlertCardProps {
  id: string;
  image: string;
  category: string;
  severity: "critical" | "warning" | "info";
  confidence: number;
  title: string;
  timeAgo: string;
  location: string;
  realVotes: number;
  fakeVotes: number;
}

export function AlertCard({
  id,
  image,
  severity,
  confidence,
  title,
  timeAgo,
  location,
  realVotes,
  fakeVotes,
}: AlertCardProps) {
  const router = useRouter();

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-gray-100 hover:-translate-y-0.5"
      onClick={() => router.push(`/dashboard/reports/${id}`)}
    >
      <div className="relative h-48 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant={severity}>{severity}</Badge>
          <Badge variant="neutral" className="bg-black/50 text-white backdrop-blur-sm border-0 text-[10px]">
            {confidence}% Confidence
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-gray-900 text-base font-bold line-clamp-1 flex-1">{title}</h3>
          <span className="flex items-center gap-1 text-[11px] text-gray-400 font-bold shrink-0">
            <Clock className="w-3 h-3" /> {timeAgo}
          </span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          Major infrastructure issue detected at {location}. Emergency crews and local authorities have been notified.
        </p>

        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold">
          <MapPin className="w-3 h-3 text-primary" /> {location}
        </div>

        <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
              <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center">
                <ThumbsUp className="w-2.5 h-2.5" />
              </div>
              Real ({realVotes})
            </div>
            <div className="flex items-center gap-1.5 text-red-500 font-bold text-[11px]">
              <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center">
                <ThumbsDown className="w-2.5 h-2.5" />
              </div>
              Fake ({fakeVotes})
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(`${window.location.origin}/dashboard/reports/${id}`);
            }}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
