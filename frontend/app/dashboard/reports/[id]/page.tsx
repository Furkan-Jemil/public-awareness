"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Share2, ChevronRight, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CommunityValidation } from "@/components/report-detail/CommunityValidation";
import { ValidationHistory } from "@/components/report-detail/ValidationHistory";
import { ConfidenceMeter } from "@/components/report-detail/ConfidenceMeter";

const MOCK_REPORT = {
  id: "WF-9021",
  title: "Water Main Break on 5th Ave",
  image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1200&auto=format&fit=crop",
  severity: "critical" as const,
  confidence: 98,
  reporter: "Automated Sensor SF-882",
  reportedAt: "45 minutes ago",
  location: "5th & Market Junction",
  breadcrumb: ["San Francisco", "Downtown District", "5th & Market Junction"],
  coordinates: "37.7833, -122.4167",
  description: `A major water main rupture has been detected at the intersection of 5th Avenue and Market Street. Initial pressure drop was recorded at 09:12 AM PST. Surveillance footage confirms significant water displacement covering all four lanes of traffic.

Emergency services have been dispatched. Public works crews estimate the main line to be a 24-inch cast iron pipe. Potential for localized flooding in basement levels of adjacent commercial properties is high.`,
  realVotes: 42,
  fakeVotes: 0,
};

const VALIDATION_EVENTS = [
  { id: "1", title: "Official Confirmation", subtitle: "Public Works Dept", time: "09:45 AM", color: "primary" as const },
  { id: "2", title: "First Verification", subtitle: "Police Patrol Unit 4", time: "09:28 AM", color: "emerald" as const },
  { id: "3", title: "Community Corroboration", subtitle: "10 Citizens Flagged", time: "09:18 AM", color: "gray" as const },
  { id: "4", title: "Report Created", subtitle: "Sensor SF-882 Triggered", time: "09:12 AM", color: "gray" as const },
];

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const report = MOCK_REPORT;

  return (
    <div className="p-6 pb-16 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        {report.breadcrumb.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-2 text-gray-400 font-medium">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            <span className={i === report.breadcrumb.length - 1 ? "text-gray-700 font-bold" : "hover:text-primary cursor-pointer transition-colors"}>
              {crumb}
            </span>
          </span>
        ))}
        <div className="ml-auto">
          <Button 
            className="bg-primary text-white px-5 h-10 rounded-xl font-bold text-sm shadow-md shadow-primary/20"
            onClick={() => {}}
          >
            Export PDF
          </Button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img src={report.image} alt={report.title} className="w-full h-[340px] object-cover" />
            <div className="absolute top-5 left-5 flex gap-2">
              <Badge variant={report.severity}>{report.severity}</Badge>
              <Badge variant="neutral" className="bg-black/60 text-white backdrop-blur-sm">
                Incident ID: #{report.id}
              </Badge>
            </div>
          </div>

          {/* Title & Meta */}
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{report.title}</h1>
                  <p className="text-sm text-gray-400 mt-1">Reported {report.reportedAt} by {report.reporter}</p>
                </div>
                <button
                  className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-primary transition-colors shrink-0"
                  onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                >
                  <Share2 className="w-4 h-4" /> Share Report
                </button>
              </div>
              <ConfidenceMeter
                percentage={report.confidence}
                label={`Data corroborated by 12 independent sensors and 5 citizen reports.`}
              />
            </CardContent>
          </Card>

          {/* Detailed Description */}
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Detailed Description</h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4 whitespace-pre-line">
                {report.description}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <CommunityValidation initialReal={report.realVotes} initialFake={report.fakeVotes} />

          {/* Map Panel */}
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-44 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
                alt="Map"
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>
            </div>
            <CardContent className="pt-4 pb-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-0.5 shrink-0">
                  <Navigation className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{report.location}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Coordinate: {report.coordinates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ValidationHistory events={VALIDATION_EVENTS} />
        </div>
      </div>
    </div>
  );
}
