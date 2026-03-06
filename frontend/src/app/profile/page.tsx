'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Report } from '@/types';
import ReportCard from '@/components/ReportCard';
import useAuthStore from '@/store/useAuthStore';
import useReportsStore from '@/store/useReportsStore';

const UserProfilePage = () => {
  const { user } = useAuthStore();
  const { reports, fetchReports } = useReportsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (user) {
      fetchReports({ reporterId: user.id }); // Assuming we can filter by reporter ID
    }
  }, [user, fetchReports]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditData({
        displayName: user?.displayName || '',
        email: user?.email || '',
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would call an API to update user profile
    console.log('Saving user profile:', editData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Access Denied</h3>
          <p className="text-gray-500">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
              <h2 className="text-xl font-semibold">{user.displayName}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Member since {new Date(user.createdAt).toLocaleDateString()}</Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Trust Score: {user.trustScore}/100
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              {isEditing ? (
                <Input
                  id="displayName"
                  name="displayName"
                  value={editData.displayName}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md border">{user.displayName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md border">{user.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Trust Score</Label>
              <div className="p-2 bg-gray-50 rounded-md border">
                {user.trustScore}/100
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${user.trustScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="p-2 bg-gray-50 rounded-md border">
                <Badge variant="outline">{user.role}</Badge>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={handleEditToggle}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleEditToggle}>Edit Profile</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No reports yet</h3>
              <p className="text-gray-500">You haven't submitted any reports yet</p>
              <Button className="mt-4">
                <a href="/reports/create">Create First Report</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;