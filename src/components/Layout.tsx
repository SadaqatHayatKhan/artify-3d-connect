
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={!!user} onLogout={logout} />
      <main className={`flex-grow ${isDashboard ? '' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
