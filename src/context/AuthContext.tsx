import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('priya_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login API call
    const demoUser = {
      id: '1',
      name: 'Demo User',
      email: email,
      avatar: 'avatar-1',
    };
    
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('priya_user', JSON.stringify(demoUser));
  };

  const loginWithGoogle = async () => {
    // Simulate Google login
    const demoUser = {
      id: '2',
      name: 'Google User',
      email: 'google@example.com',
      avatar: 'avatar-2',
    };
    
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('priya_user', JSON.stringify(demoUser));
  };

  const loginWithApple = async () => {
    // Simulate Apple login
    const demoUser = {
      id: '3',
      name: 'Apple User',
      email: 'apple@example.com',
      avatar: 'avatar-3',
    };
    
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('priya_user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('priya_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('priya_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    loginWithGoogle,
    loginWithApple,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};