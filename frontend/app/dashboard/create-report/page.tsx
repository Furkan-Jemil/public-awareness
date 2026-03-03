"use client";

import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BasicInfoSection } from "@/components/create-report/BasicInfoSection";
import { ClassificationSection } from "@/components/create-report/ClassificationSection";
import { MediaAssetsSection } from "@/components/create-report/MediaAssetsSection";
import { MapLocationSection } from "@/components/create-report/MapLocationSection";

export default function CreateReportPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="p-10 pb-20 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create New Report</h1>
        <p className="text-gray-500 mt-2 font-medium">Submit a detailed report to the centralized management system.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <BasicInfoSection />
            <MediaAssetsSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ClassificationSection />
            <MapLocationSection />

            <div className="flex items-center justify-end gap-4 pt-4">
              <Button type="button" variant="outline" className="h-14 px-10 rounded-xl font-bold text-gray-600" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="h-14 px-10 rounded-xl font-bold flex gap-2 shadow-lg shadow-primary/20">
                <Send className="w-5 h-5" /> Submit Report
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
