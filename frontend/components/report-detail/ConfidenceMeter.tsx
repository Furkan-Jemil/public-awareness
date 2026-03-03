interface ConfidenceMeterProps {
  percentage: number;
  label?: string;
}

export function ConfidenceMeter({ percentage, label }: ConfidenceMeterProps) {
  const color =
    percentage >= 85 ? "bg-emerald-500" :
    percentage >= 60 ? "bg-orange-400" :
    "bg-red-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-700">Confidence Meter</span>
        <span className="text-sm font-extrabold text-emerald-600">{percentage}% Verified</span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {label && (
        <p className="text-[11px] text-gray-400">{label}</p>
      )}
    </div>
  );
}
