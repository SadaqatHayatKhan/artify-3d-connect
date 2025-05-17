
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Founder & CEO",
      bio: "3D artist with 10+ years of experience in creating digital art for major studios.",
    },
    {
      name: "David Smith",
      role: "Chief Technology Officer",
      bio: "Former senior developer at a major 3D software company with expertise in WebGL and Three.js.",
    },
    {
      name: "Sarah Williams",
      role: "Creative Director",
      bio: "Award-winning 3D artist and animator with a passion for helping other artists showcase their work.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Artify 3D</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a team of artists and developers passionate about creating the ultimate platform for 3D art presentation and discovery.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            
            <div className="space-y-6 text-lg">
              <p>
                Artify 3D began in 2023 as a passion project by a group of 3D artists who were frustrated with the limitations of existing platforms for showcasing their work. We believed that 3D art deserved a dedicated platform that could properly highlight its unique qualities and interactive potential.
              </p>
              
              <p>
                What started as a simple idea quickly evolved into a comprehensive platform designed specifically for the needs of the 3D art community. Our mission is to provide artists with the tools they need to showcase their work, connect with peers, and grow professionally.
              </p>
              
              <p>
                Today, Artify 3D has grown into a vibrant community of thousands of artists from around the world, ranging from hobbyists to industry professionals. We continue to develop and improve our platform based on feedback from our community, ensuring that we're always meeting the evolving needs of 3D artists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're guided by a set of core principles that inform everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border border-border card-hover">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Empower Artists</h3>
                <p className="text-muted-foreground">We believe in providing tools that help artists succeed and grow professionally.</p>
              </CardContent>
            </Card>

            <Card className="border border-border card-hover">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Foster Community</h3>
                <p className="text-muted-foreground">We're committed to building a supportive environment where artists can connect and collaborate.</p>
              </CardContent>
            </Card>

            <Card className="border border-border card-hover">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Celebrate Excellence</h3>
                <p className="text-muted-foreground">We showcase and promote outstanding work to inspire and elevate the entire community.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Artify 3D working to create the best platform for 3D artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border border-border card-hover">
                <CardContent className="p-6">
                  <div className="h-32 w-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-primary/50">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-center">{member.name}</h3>
                  <p className="text-accent mb-3 text-center">{member.role}</p>
                  <p className="text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
