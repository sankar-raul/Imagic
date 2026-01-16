import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('acess_token');
    // const savedUser = localStorage.getItem('dashboardUser');
    
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // TODO: Replace with actual API call
    // For now, using hardcoded credentials
    const ADMIN_EMAIL = 'admin@imagic.com';
    const ADMIN_PASSWORD = 'admin123';

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        
      const token = btoa(`${email}:${Date.now()}`); 
      
      localStorage.setItem('access_token', token);
      
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
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
