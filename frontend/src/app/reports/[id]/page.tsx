'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReportCard from '@/components/ReportCard';
import { formatTimeAgo, getUrgencyColor, getStatusColor } from '@/utils';
import { ThumbsUp, ThumbsDown, Flag, MessageSquare, Share2, Eye } from 'lucide-react';
import useReportsStore from '@/store/useReportsStore';
import { Report } from '@/types';

const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentReport, fetchReportById, toggleReaction, flagReport, loading } = useReportsStore();
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagReason, setFlagReason] = useState('');

  useEffect(() => {
    if (id) {
      fetchReportById(id);
    }
  }, [id, fetchReportById]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading report...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Report not found</h3>
          <p className="text-gray-500">The report you're looking for doesn't exist or has been removed</p>
        </div>
      </div>
    );
  }

  // Calculate real and fake votes
  const realVotes = currentReport.reactions?.filter(r => !r.isFake).length || 0;
  const fakeVotes = currentReport.reactions?.filter(r => r.isFake).length || 0;

  const handleVote = async (isFake: boolean) => {
    if (currentReport) {
      try {
        await toggleReaction(currentReport.id, isFake);
        // The store will update the report automatically
      } catch (error) {
        console.error('Error toggling reaction:', error);
      }
    }
  };

  const handleFlag = async () => {
    if (currentReport && flagReason) {
      try {
        await flagReport(currentReport.id, flagReason);
        setShowFlagModal(false);
        setFlagReason('');
      } catch (error) {
        console.error('Error flagging report:', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => window.history.back()}>
          ← Back to Reports
        </Button>
      </div>

      {/* Report Header */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge className={`${getUrgencyColor(currentReport.urgencyLevel)} border`}>
              {currentReport.urgencyLevel.charAt(0).toUpperCase() + currentReport.urgencyLevel.slice(1)}
            </Badge>
            <Badge variant="secondary">{currentReport.category.name}</Badge>
            <Badge className={`${getStatusColor(currentReport.status)} border`}>
              {currentReport.status.replace('_', ' ').charAt(0).toUpperCase() + currentReport.status.replace('_', ' ').slice(1)}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{currentReport.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{currentReport.area.name}, {currentReport.city.name}</span>
            <span>•</span>
            <span>{formatTimeAgo(currentReport.createdAt)}</span>
            <span>•</span>
            <span>By {currentReport.reporter.displayName}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 mb-6">{currentReport.description}</p>
          
          {/* Confidence and Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span>{realVotes}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-4 w-4 text-red-600" />
                <span>{fakeVotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{currentReport.confidenceScore}%</span>
                <span className="text-xs text-muted-foreground">confidence</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFlagModal(true)}
              >
                <Flag className="h-4 w-4 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Gallery */}
      {currentReport.media && currentReport.media.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Media Evidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentReport.media.map((media, index) => (
                <div key={media.id} className="aspect-video">
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <video
                      src={media.url}
                      controls
                      className="w-full h-full object-contain rounded-md"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voting Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Validate Report</CardTitle>
          <p className="text-sm text-muted-foreground">Help the community verify this report</p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className={`flex-1 ${currentReport.reactions?.some(r => r.isFake === false) ? 'bg-green-50 border-green-500' : ''}`}
              onClick={() => handleVote(false)}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Real / True
            </Button>
            <Button
              variant="outline"
              className={`flex-1 ${currentReport.reactions?.some(r => r.isFake === true) ? 'bg-red-50 border-red-500' : ''}`}
              onClick={() => handleVote(true)}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Fake / False
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your vote helps determine the report's credibility
          </p>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="font-medium text-sm">Anonymous User</div>
                  <p className="text-sm mt-1">Thanks for reporting this issue. I witnessed the same situation yesterday.</p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <button className="hover:underline">Reply</button>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="font-medium text-sm">Local Resident</div>
                  <p className="text-sm mt-1">The city authorities were notified about this issue last week but haven't taken any action yet.</p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <button className="hover:underline">Reply</button>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="flex-1">
              <textarea
                placeholder="Add a comment..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm">Post Comment</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flag Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Report this content</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help us maintain a safe and trustworthy community by reporting inappropriate content.
            </p>
            <textarea
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              placeholder="Describe why you're reporting this content..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[100px] mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowFlagModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleFlag} disabled={!flagReason.trim()}>
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetailPage;