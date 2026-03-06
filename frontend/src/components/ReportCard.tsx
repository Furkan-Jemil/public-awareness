import React from 'react';
import Link from 'next/link';
import { Report } from '@/types';
import { formatTimeAgo, getUrgencyColor, getStatusColor } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReportCardProps {
  report: Report;
  onVote?: (reportId: string, isFake: boolean) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onVote }) => {
  // Calculate real and fake votes
  const realVotes = report.reactions?.filter(r => !r.isFake).length || 0;
  const fakeVotes = report.reactions?.filter(r => r.isFake).length || 0;
  const totalVotes = realVotes + fakeVotes;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Media Preview */}
        {report.media && report.media.length > 0 && (
          <div className="relative h-48 w-full overflow-hidden">
            {report.media[0].type === 'image' ? (
              <img
                src={report.media[0].url}
                alt={report.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={report.media[0].url}
                className="w-full h-full object-cover"
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <CardContent className="p-4 flex flex-col flex-grow">
          {/* Category and Urgency Badges */}
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary">{report.category.name}</Badge>
            <Badge className={`${getUrgencyColor(report.urgencyLevel)} border`}>
              {report.urgencyLevel.charAt(0).toUpperCase() + report.urgencyLevel.slice(1)}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-1 line-clamp-2">{report.title}</h3>

          {/* Location */}
          <p className="text-sm text-muted-foreground mb-2">
            {report.area.name}, {report.city.name}
          </p>

          {/* Description Preview */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {report.description}
          </p>

          {/* Stats */}
          <div className="flex justify-between items-center mt-auto pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(report.createdAt)}
              </span>
              <Badge className={`${getStatusColor(report.status)} border text-xs`}>
                {report.status.replace('_', ' ').charAt(0).toUpperCase() + report.status.replace('_', ' ').slice(1)}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">{report.confidenceScore}%</span>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onVote?.(report.id, false)}
                  className="p-1 h-auto"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <span className="text-xs">{realVotes}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onVote?.(report.id, true)}
                  className="p-1 h-auto"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <span className="text-xs">{fakeVotes}</span>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <Link href={`/reports/${report.id}`} className="mt-3">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default ReportCard;