import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    // This is a mock implementation
    // In a real app, you would make an API call to authenticate
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email === 'user@example.com' && password === 'password') {
          const userData: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // This is a mock implementation
    // In a real app, you would make an API call to register
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          firstName,
          lastName,
        };
        
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        resolve();
      }, 1000);
    });
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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