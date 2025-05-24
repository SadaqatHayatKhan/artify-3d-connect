
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Artwork = Tables<'artworks'>;
type Profile = Tables<'profiles'>;

type GalleryItem = Artwork & {
  profiles?: Profile | null;
};

type FilterCategory = 'All' | 'Characters' | 'Environments' | 'Abstract' | 'Products';

const Gallery = () => {
  const [artworks, setArtworks] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch artworks with profile data
  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('artworks')
          .select(`
            *,
            profiles:user_id (
              id,
              display_name,
              bio,
              location,
              avatar_url
            )
          `);

        if (activeCategory !== 'All') {
          query = query.eq('category', activeCategory);
        }

        const { data, error } = await query
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setArtworks(data || []);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        toast({
          title: 'Error',
          description: 'Failed to load artworks. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, [activeCategory, toast]);

  // Increment view count
  const handleViewArtwork = async (id: string, currentViews: number) => {
    try {
      const { error } = await supabase
        .from('artworks')
        .update({ views: currentViews + 1 })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setArtworks(prev => prev.map(artwork => 
        artwork.id === id ? { ...artwork, views: (artwork.views || 0) + 1 } : artwork
      ));
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  // Like artwork functionality
  const handleLikeArtwork = async (id: string, currentLikes: number) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to like artworks',
        variant: 'default',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('artworks')
        .update({ likes: currentLikes + 1 })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setArtworks(prev => prev.map(artwork => 
        artwork.id === id ? { ...artwork, likes: (artwork.likes || 0) + 1 } : artwork
      ));

      toast({
        title: 'Success',
        description: 'Artwork liked!',
      });
    } catch (error) {
      console.error('Error liking artwork:', error);
      toast({
        title: 'Error',
        description: 'Failed to like artwork. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Delete artwork (for owners)
  const handleDeleteArtwork = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setArtworks(prev => prev.filter(artwork => artwork.id !== id));

      toast({
        title: 'Success',
        description: 'Artwork deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete artwork. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCategoryFilter = (category: FilterCategory) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing 3D artworks created by talented artists from around the world.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            {(['All', 'Characters', 'Environments', 'Abstract', 'Products'] as FilterCategory[]).map(category => (
              <Button 
                key={category} 
                variant={activeCategory === category ? "default" : "outline"} 
                className={activeCategory === category ? "bg-primary" : ""}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : artworks.length > 0 ? (
            /* Gallery Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className="w-32 h-32 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
                          {artwork.category === 'Abstract' ? (
                            <path d="M12 3c.3 0 6.4 3.6 9 4.2-9 5.4-18 0-18 0C5.6 6.6 11.7 3 12 3z M12 3c-3 0-7 5.7-7 12s4 9 7 9 7-2.7 7-9-4-12-7-12z M12 3c-3 0-6 7.2-6 14s3 7 6 7 6 0 6-7-3-14-6-14z"></path>
                          ) : artwork.category === 'Characters' ? (
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path>
                          ) : artwork.category === 'Environments' ? (
                            <path d="M2 22l10-10M16 3l-4 4L6 3l4 4-4 4 4-4 4 4-4-4 10-4-10 4"></path>
                          ) : (
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          )}
                        </svg>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{artwork.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          by {artwork.profiles?.display_name || 'Unknown Artist'}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">{artwork.category}</span>
                    </div>
                    {artwork.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{artwork.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-3 text-muted-foreground text-sm">
                        <button 
                          onClick={() => handleLikeArtwork(artwork.id, artwork.likes || 0)}
                          className="flex items-center hover:text-primary transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                          </svg>
                          {artwork.likes || 0}
                        </button>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          {artwork.views || 0}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {user && user.id === artwork.user_id && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                            onClick={() => handleDeleteArtwork(artwork.id)}
                          >
                            Delete
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewArtwork(artwork.id, artwork.views || 0)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No artworks found</h3>
              <p className="text-muted-foreground mb-6">
                {activeCategory !== 'All' 
                  ? `There are no artworks in the ${activeCategory} category yet.`
                  : 'There are no artworks available yet.'}
              </p>
              {user && (
                <Button onClick={() => navigate('/dashboard')}>Upload Your Artwork</Button>
              )}
            </div>
          )}
          
          {/* Load More Button - only show if there are artworks */}
          {artworks.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8">Load More</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Share Your Art?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our creative community today and showcase your 3D creations to a global audience.
          </p>
          {user ? (
            <Button 
              className="bg-primary hover:bg-primary/90 px-8" 
              onClick={() => navigate('/dashboard')}
            >
              Upload Your Art
            </Button>
          ) : (
            <Button 
              className="bg-primary hover:bg-primary/90 px-8"
              onClick={() => navigate('/signup')}  
            >
              Sign Up Now
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
