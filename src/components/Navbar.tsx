
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type NavbarProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient">Artify 3D</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">Gallery</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          
          <div className="ml-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
                <Button onClick={onLogout} variant="outline" className="text-foreground">Log Out</Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Button
                  variant="outline"
                  className="text-foreground"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-foreground p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link to="/" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/gallery" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
            <Link to="/about" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Button 
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }} 
                  variant="outline" 
                  className="w-full justify-start text-foreground"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full justify-center text-foreground"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  Log In
                </Button>
                <Button 
                  className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
