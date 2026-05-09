'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Use a timeout to avoid cascading renders warning in Dev
        setTimeout(() => {
          setUser(parsed);
        }, 0);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = { email, name: email.split('@')[0] };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/');
  };

  const signup = async (email: string, name: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const isAuthenticated = !!user;

  // Protect routes (simplified)
  useEffect(() => {
    const publicRoutes = ['/login', '/signup'];
    if (user === null && !publicRoutes.includes(pathname)) {
      // router.push('/login');
    }
  }, [user, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
