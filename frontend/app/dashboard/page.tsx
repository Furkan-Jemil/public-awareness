"use client";

import { AlertCard, AlertCardProps } from "@/components/dashboard/AlertCard";
import { FilterBar } from "@/components/dashboard/FilterBar";

const MOCK_ALERTS: AlertCardProps[] = [
  {
    id: "1",
    title: "Water Main Break on 5th Ave",
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
    severity: "critical",
    confidence: 98,
    timeAgo: "2 mins ago",
    location: "Downtown District",
    realVotes: 128,
    fakeVotes: 3,
    category: "Infrastructure",
  },
  {
    id: "2",
    title: "Suspicious Drone Activity",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop",
    severity: "warning",
    confidence: 85,
    timeAgo: "15 mins ago",
    location: "Suburbs East",
    realVotes: 42,
    fakeVotes: 12,
    category: "Safety",
  },
  {
    id: "3",
    title: "Planned Power Maintenance",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    severity: "info",
    confidence: 92,
    timeAgo: "45 mins ago",
    location: "Industrial Zone",
    realVotes: 89,
    fakeVotes: 1,
    category: "Utilities",
  },
  {
    id: "4",
    title: "Road Blockage on Main St",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
    severity: "warning",
    confidence: 70,
    timeAgo: "1 hour ago",
    location: "Downtown District",
    realVotes: 21,
    fakeVotes: 4,
    category: "Transportation",
  },
  {
    id: "5",
    title: "Zero Visibility Fog - Bridge",
    image: "https://images.unsplash.com/photo-1482849297070-f4fae2173efe?q=80&w=800&auto=format&fit=crop",
    severity: "critical",
    confidence: 95,
    timeAgo: "1 hour ago",
    location: "Coastal Route",
    realVotes: 340,
    fakeVotes: 0,
    category: "Weather",
  },
  {
    id: "6",
    title: "New Cooling Center Open",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
    severity: "info",
    confidence: 88,
    timeAgo: "2 hours ago",
    location: "Suburbs West",
    realVotes: 56,
    fakeVotes: 2,
    category: "Public Service",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8 pb-12">
      <FilterBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {MOCK_ALERTS.map((alert) => (
          <AlertCard key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  );
}
