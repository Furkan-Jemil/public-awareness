"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Flag, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CommunityValidationProps {
  initialReal: number;
  initialFake: number;
}

export function CommunityValidation({ initialReal, initialFake }: CommunityValidationProps) {
  const [real, setReal] = useState(initialReal);
  const [fake, setFake] = useState(initialFake);
  const [voted, setVoted] = useState<"real" | "fake" | null>(null);
  const [flagged, setFlagged] = useState(false);

  const handleVote = (type: "real" | "fake") => {
    if (voted === type) return; // already voted
    if (voted === "real") setReal((r) => r - 1);
    if (voted === "fake") setFake((f) => f - 1);
    if (type === "real") setReal((r) => r + 1);
    if (type === "fake") setFake((f) => f + 1);
    setVoted(type);
  };

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="pt-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900">Community Validation</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className={cn(
            "rounded-2xl p-5 flex flex-col items-center gap-1 border-2 transition-all",
            voted === "real" ? "border-emerald-300 bg-emerald-50" : "border-gray-100 bg-gray-50/30"
          )}>
            <span className={cn("text-4xl font-black", voted === "real" ? "text-emerald-600" : "text-emerald-500")}>{real}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Real</span>
          </div>
          <div className={cn(
            "rounded-2xl p-5 flex flex-col items-center gap-1 border-2 transition-all",
            voted === "fake" ? "border-red-300 bg-red-50" : "border-gray-100 bg-gray-50/30"
          )}>
            <span className={cn("text-4xl font-black", voted === "fake" ? "text-red-500" : "text-gray-400")}>{fake}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Fake</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => handleVote("real")}
            className={cn(
              "w-full h-12 font-bold flex gap-2 rounded-xl transition-all",
              voted === "real"
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-900 text-white hover:bg-gray-800"
            )}
          >
            {voted === "real" ? <Check className="w-5 h-5" /> : <ThumbsUp className="w-5 h-5" />}
            {voted === "real" ? "Vote Submitted" : "Submit Official Vote"}
          </Button>

          <Button
            onClick={() => { setFlagged(!flagged); }}
            variant="outline"
            className={cn(
              "w-full h-12 font-bold flex gap-2 rounded-xl border-2 transition-all",
              flagged
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                : "border-red-100 text-red-500 hover:bg-red-50"
            )}
          >
            <Flag className="w-4 h-4" />
            {flagged ? "Report Flagged" : "Flag as Incorrect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
