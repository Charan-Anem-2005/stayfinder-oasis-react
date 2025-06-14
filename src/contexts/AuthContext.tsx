
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('stayfinder_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Mock login - in real app this would call your backend
    if (username && password) {
      const mockUser = {
        id: '1',
        username,
        email: `${username}@example.com`
      };
      setUser(mockUser);
      localStorage.setItem('stayfinder_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    // Mock register - in real app this would call your backend
    if (username && email && password) {
      const mockUser = {
        id: '1',
        username,
        email
      };
      setUser(mockUser);
      localStorage.setItem('stayfinder_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stayfinder_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
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
