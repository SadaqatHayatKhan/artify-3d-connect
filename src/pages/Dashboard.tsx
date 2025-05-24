
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Tables } from '@/integrations/supabase/types';

type Artwork = Tables<'artworks'>;
type Profile = Tables<'profiles'>;

const artworkFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  image_url: z.string().optional(),
});

type ArtworkFormValues = z.infer<typeof artworkFormSchema>;

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({
    artworks: 0,
    views: 0,
    likes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Characters",
      image_url: "",
    },
  });

  // Fetch user data, artworks and stats
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }
        
        setUserProfile(profileData);

        // Fetch user artworks
        const { data: artworksData, error: artworksError } = await supabase
          .from('artworks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (artworksError) throw artworksError;
        setArtworks(artworksData || []);
        
        // Calculate stats
        if (artworksData) {
          const totalViews = artworksData.reduce((sum, artwork) => sum + (artwork.views || 0), 0);
          const totalLikes = artworksData.reduce((sum, artwork) => sum + (artwork.likes || 0), 0);
          
          setStats({
            artworks: artworksData.length,
            views: totalViews,
            likes: totalLikes,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, toast]);

  const openNewArtworkDialog = () => {
    form.reset({
      title: "",
      description: "",
      category: "Characters",
      image_url: "",
    });
    setCurrentArtwork(null);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditArtworkDialog = (artwork: Artwork) => {
    form.reset({
      title: artwork.title,
      description: artwork.description || "",
      category: artwork.category,
      image_url: artwork.image_url || "",
    });
    setCurrentArtwork(artwork);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: ArtworkFormValues) => {
    if (!user) return;
    
    setIsUploading(true);
    try {
      if (isEditMode && currentArtwork) {
        // UPDATE operation
        const { error } = await supabase
          .from('artworks')
          .update({
            title: values.title,
            description: values.description,
            category: values.category,
            image_url: values.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentArtwork.id);
        
        if (error) throw error;
        
        // Update local state
        setArtworks(prev => 
          prev.map(art => 
            art.id === currentArtwork.id 
              ? { ...art, ...values, updated_at: new Date().toISOString() } 
              : art
          )
        );
        
        toast({
          title: 'Success',
          description: 'Artwork updated successfully',
        });
      } else {
        // CREATE operation
        const { data, error } = await supabase
          .from('artworks')
          .insert({
            title: values.title,
            description: values.description,
            category: values.category,
            image_url: values.image_url,
            user_id: user.id,
          })
          .select()
          .single();
        
        if (error) throw error;
        
        // Update local state
        if (data) {
          setArtworks(prev => [data, ...prev]);
          setStats(prev => ({
            ...prev,
            artworks: prev.artworks + 1
          }));
        }
        
        toast({
          title: 'Success',
          description: 'Artwork created successfully',
        });
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving artwork:', error);
      toast({
        title: 'Error',
        description: isEditMode ? 'Failed to update artwork' : 'Failed to create artwork',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // DELETE operation
  const handleDeleteArtwork = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const deletedArtwork = artworks.find(art => art.id === id);
      
      setArtworks(prev => prev.filter(art => art.id !== id));
      setStats(prev => ({
        artworks: prev.artworks - 1,
        views: prev.views - (deletedArtwork?.views || 0),
        likes: prev.likes - (deletedArtwork?.likes || 0),
      }));

      toast({
        title: 'Success',
        description: 'Artwork deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete artwork',
        variant: 'destructive',
      });
    }
  };

  // Get display name from user metadata or email
  const displayName = userProfile?.display_name || 
                      user?.user_metadata?.name || 
                      user?.email?.split('@')[0] || 
                      'Artist';

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {displayName}!</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={openNewArtworkDialog}
        >
          Upload New Artwork
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-border">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Artworks</p>
            <p className="text-3xl font-bold">{stats.artworks}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Total Views</p>
            <p className="text-3xl font-bold">{stats.views}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Total Likes</p>
            <p className="text-3xl font-bold">{stats.likes}</p>
          </CardContent>
        </Card>
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
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : artworks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artworks.map((artwork) => (
                    <Card key={artwork.id} className="overflow-hidden border border-border card-hover">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        {artwork.image_url ? (
                          <img 
                            src={artwork.image_url} 
                            alt={artwork.title} 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                              {artwork.category === 'Abstract' ? (
                                <path d="M12 3c.3 0 6.4 3.6 9 4.2-9 5.4-18 0-18 0C5.6 6.6 11.7 3 12 3z"></path>
                              ) : artwork.category === 'Characters' ? (
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path>
                              ) : (
                                <path d="M2 22l10-10M16 3l-4 4L6 3l4 4-4 4 4-4 4 4-4-4 10-4-10 4"></path>
                              )}
                            </svg>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{artwork.title}</h3>
                            <p className="text-muted-foreground text-xs">{new Date(artwork.created_at || '').toLocaleDateString()}</p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full">{artwork.category}</span>
                        </div>
                        {artwork.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{artwork.description}</p>
                        )}
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex space-x-3 text-muted-foreground text-sm">
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                              </svg>
                              {artwork.likes || 0}
                            </span>
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              {artwork.views || 0}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => openEditArtworkDialog(artwork)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteArtwork(artwork.id)}
                              className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
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
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={openNewArtworkDialog}
                  >
                    Upload Artwork
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile and Quick Links */}
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
                  <p className="text-muted-foreground text-sm">
                    {userProfile?.bio || 'No bio yet. Tell the world about yourself and your art.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground text-sm">
                    {userProfile?.location || 'Not specified'}
                  </p>
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
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={openNewArtworkDialog}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  New Artwork
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/gallery')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                  View Gallery
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

      {/* Artwork Form Dialog for CREATE and UPDATE */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Artwork" : "Upload New Artwork"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update your artwork details below." 
                : "Share your 3D creation with the community."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter artwork title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your artwork (optional)" 
                        {...field} 
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Characters">Characters</SelectItem>
                        <SelectItem value="Environments">Environments</SelectItem>
                        <SelectItem value="Abstract">Abstract</SelectItem>
                        <SelectItem value="Products">Products</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.png" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Enter a URL for your artwork image, or leave blank to use a placeholder.
                    </p>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isUploading} 
                  className="bg-primary hover:bg-primary/90"
                >
                  {isUploading ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                      {isEditMode ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    isEditMode ? 'Save Changes' : 'Upload Artwork'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
