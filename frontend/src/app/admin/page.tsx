'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Report } from '@/types';
import ReportCard from '@/components/ReportCard';
import useAuthStore from '@/store/useAuthStore';
import useReportsStore from '@/store/useReportsStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { reports, fetchReports } = useReportsStore();
  const [activeTab, setActiveTab] = useState<'flagged' | 'all'>('flagged');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionReason, setActionReason] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'remove' | 'verify' | 'ban'>('approve');

  useEffect(() => {
    // Only fetch reports if user has admin privileges
    if (user && (user.role === 'admin' || user.role === 'super_admin')) {
      fetchReports(activeTab === 'flagged' ? { status: 'under_review' } : {});
    }
  }, [user, activeTab, fetchReports]);

  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Access Denied</h3>
          <p className="text-gray-500">You don't have permission to access the admin panel</p>
        </div>
      </div>
    );
  }

  const handleReportAction = (report: Report, action: 'approve' | 'remove' | 'verify' | 'ban') => {
    setSelectedReport(report);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (selectedReport) {
      // In a real app, this would call an API to perform the moderation action
      console.log(`Performing ${actionType} action on report ${selectedReport.id} with reason: ${actionReason}`);
      setShowActionModal(false);
      setActionReason('');
      setSelectedReport(null);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <p className="text-muted-foreground">Manage reports and monitor platform activity</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Total Reports</h3>
              <p className="text-2xl font-bold text-blue-900">{reports.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">Under Review</h3>
              <p className="text-2xl font-bold text-yellow-900">
                {reports.filter(r => r.status === 'under_review').length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-red-800">Flagged Reports</h3>
              <p className="text-2xl font-bold text-red-900">
                {reports.filter(r => r.status === 'under_review').length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Verified Reports</h3>
              <p className="text-2xl font-bold text-green-900">
                {reports.filter(r => r.status === 'verified').length}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeTab === 'flagged' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('flagged')}
            >
              Flagged Reports
            </Button>
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('all')}
            >
              All Reports
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">
              {activeTab === 'flagged' ? 'Reports Needing Review' : 'All Reports'}
            </h3>
            
            {reports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{report.title}</h4>
                      <Badge className="capitalize">
                        {report.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{report.area.name}, {report.city.name}</span>
                      <span>•</span>
                      <span>{report.category.name}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReportAction(report, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReportAction(report, 'remove')}
                      >
                        Remove
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReportAction(report, 'verify')}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {activeTab === 'flagged' ? 'No flagged reports' : 'No reports available'}
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'flagged' 
                    ? 'There are no reports requiring moderation at this time' 
                    : 'There are no reports to display'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Modal */}
      {showActionModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {actionType === 'approve' && 'Approve Report'}
              {actionType === 'remove' && 'Remove Report'}
              {actionType === 'verify' && 'Verify Report'}
              {actionType === 'ban' && 'Ban User'}
            </h3>
            
            <div className="mb-4">
              <h4 className="font-medium">{selectedReport.title}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {selectedReport.description}
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium mb-1">
                Reason for action
              </label>
              <textarea
                id="reason"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Provide a reason for this action..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowActionModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={confirmAction}
                className={
                  actionType === 'remove' ? 'bg-red-600 hover:bg-red-700' :
                  actionType === 'ban' ? 'bg-red-600 hover:bg-red-700' :
                  ''
                }
              >
                Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;