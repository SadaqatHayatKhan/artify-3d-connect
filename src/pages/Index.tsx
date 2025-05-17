
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // Sample features
  const features = [
    {
      title: "Stunning Showcase",
      description: "Display your 3D artwork in a beautiful, interactive gallery that captivates viewers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-3 text-primary">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      title: "Global Community",
      description: "Join a thriving community of 3D artists, designers and enthusiasts from around the world.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-3 text-primary">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
    },
    {
      title: "Professional Growth",
      description: "Gain visibility, receive feedback, and connect with potential clients and collaborators.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-3 text-primary">
          <path d="M12 20v-6M6 20V10M18 20V4"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-24 md:py-32">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Showcase Your 3D Creations</h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 opacity-90 animate-fade-in">
            The ultimate platform for 3D artists to share, discover and connect. 
            Bring your digital sculptures, environments and characters to life.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
            >
              <Link to="/signup">Join Artify 3D</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              <Link to="/gallery">Explore Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Artify 3D?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the tools and platform you need to showcase your talent and grow as a 3D artist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border card-hover">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Artworks</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover stunning 3D creations from talented artists around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden shadow-md card-hover">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
                      <path d="M12 3c.3 0 6.4 3.6 9 4.2-9 5.4-18 0-18 0C5.6 6.6 11.7 3 12 3z" />
                      <path d="M12 3c-3 0-7 5.7-7 12s4 9 7 9 7-2.7 7-9-4-12-7-12z" />
                      <path d="M12 3c-3 0-6 7.2-6 14s3 7 6 7 6 0 6-7-3-14-6-14z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-medium text-lg mb-1">3D Artwork Title {item}</h3>
                  <p className="text-muted-foreground text-sm mb-2">by Artist Name</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/gallery">View All Artworks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Showcase Your Work?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our creative community today and start sharing your 3D masterpieces with the world.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8">
            <Link to="/signup">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
