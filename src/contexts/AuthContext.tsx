
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/components/ui/use-toast';

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder for Supabase authentication check
    // After connecting Supabase, this will use supabase.auth.getUser() or similar
    const checkAuthState = async () => {
      try {
        // Simulate checking local storage for user session
        const storedUser = localStorage.getItem('artify3d_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate signup - This will be replaced with Supabase Auth
      // After connecting Supabase, this will use supabase.auth.signUp()
      console.log(`Sign up with: ${email}, ${name}`);
      
      // Create mock user (replace with Supabase response)
      const newUser = {
        id: `user_${Math.random().toString(36).slice(2, 10)}`,
        email,
        name
      };
      
      setUser(newUser);
      localStorage.setItem('artify3d_user', JSON.stringify(newUser));
      toast({ title: "Success", description: "Account created successfully!" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create account", 
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate login - This will be replaced with Supabase Auth
      // After connecting Supabase, this will use supabase.auth.signInWithPassword()
      console.log(`Login with: ${email}`);
      
      // Mock user login (replace with Supabase response)
      const loggedInUser = {
        id: `user_${Math.random().toString(36).slice(2, 10)}`,
        email,
        name: email.split('@')[0]
      };
      
      setUser(loggedInUser);
      localStorage.setItem('artify3d_user', JSON.stringify(loggedInUser));
      toast({ title: "Success", description: "Logged in successfully!" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to login", 
        variant: "destructive" 
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate logout - This will be replaced with Supabase Auth
      // After connecting Supabase, this will use supabase.auth.signOut()
      console.log('Logging out');
      
      setUser(null);
      localStorage.removeItem('artify3d_user');
      toast({ title: "Success", description: "Logged out successfully!" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to logout", 
        variant: "destructive" 
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
