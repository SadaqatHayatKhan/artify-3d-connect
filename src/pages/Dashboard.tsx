
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dashboard stats (mock data)
  const stats = [
    { label: 'Artworks', value: '0' },
    { label: 'Views', value: '0' },
    { label: 'Likes', value: '0' },
    { label: 'Comments', value: '0' },
  ];

  // Get display name from user metadata or email
  const displayName = user?.user_metadata?.name || 
                      user?.email?.split('@')[0] || 
                      'Artist';

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {displayName}!</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Upload New Artwork</Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <p className="text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>My Artworks</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No artworks yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start showcasing your talent by uploading your first 3D artwork.
                </p>
                <Button className="bg-primary hover:bg-primary/90">Upload Artwork</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">No recent activity to show</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary/70">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">{displayName}</h3>
                <p className="text-muted-foreground mb-2">{user?.email}</p>
                <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Bio</h4>
                  <p className="text-muted-foreground text-sm">No bio yet. Tell the world about yourself and your art.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground text-sm">Not specified</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Member Since</h4>
                  <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  New Artwork
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  View Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
