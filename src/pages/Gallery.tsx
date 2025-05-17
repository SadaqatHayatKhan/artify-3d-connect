
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Gallery = () => {
  // Sample gallery items
  const galleryItems = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `3D Artwork ${i + 1}`,
    artist: `Artist ${(i % 3) + 1}`,
    category: ['Character', 'Environment', 'Abstract', 'Product'][i % 4],
    likes: Math.floor(Math.random() * 100) + 10,
    views: Math.floor(Math.random() * 1000) + 100,
  }));

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
          {/* Filter Controls - Static in this version */}
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            <Button variant="outline" className="bg-primary/5">All Categories</Button>
            <Button variant="outline">Characters</Button>
            <Button variant="outline">Environments</Button>
            <Button variant="outline">Abstract</Button>
            <Button variant="outline">Products</Button>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border border-border card-hover">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
                      {item.id % 3 === 0 ? (
                        // Abstract shape
                        <path d="M12 3c.3 0 6.4 3.6 9 4.2-9 5.4-18 0-18 0C5.6 6.6 11.7 3 12 3z M12 3c-3 0-7 5.7-7 12s4 9 7 9 7-2.7 7-9-4-12-7-12z M12 3c-3 0-6 7.2-6 14s3 7 6 7 6 0 6-7-3-14-6-14z"></path>
                      ) : item.id % 3 === 1 ? (
                        // Character
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path>
                      ) : (
                        // Environment
                        <path d="M2 22l10-10M16 3l-4 4L6 3l4 4-4 4 4-4 4 4-4-4 10-4-10 4"></path>
                      )}
                    </svg>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">by {item.artist}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">{item.category}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-3 text-muted-foreground text-sm">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {item.views}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8">Load More</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Share Your Art?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our creative community today and showcase your 3D creations to a global audience.
          </p>
          <Button className="bg-primary hover:bg-primary/90 px-8">Sign Up Now</Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
