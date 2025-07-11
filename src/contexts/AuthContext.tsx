
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'audit' | 'department';
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database - in production, this would be handled by Supabase
const mockUsers = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' as const },
  { id: '2', username: 'audit', password: 'audit123', role: 'audit' as const, department: 'Audit Department' },
  { id: '3', username: 'finance', password: 'finance123', role: 'department' as const, department: 'Finance Department' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('nwr_audit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const userObj = { 
        id: foundUser.id, 
        username: foundUser.username, 
        role: foundUser.role,
        department: foundUser.department 
      };
      setUser(userObj);
      setIsAuthenticated(true);
      localStorage.setItem('nwr_audit_user', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nwr_audit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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
