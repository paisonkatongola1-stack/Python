"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import { AuthModel } from "pocketbase";

interface AuthContextType {
  user: AuthModel | null;
  loading: boolean;
  signOut: () => void;
  isValid: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
  isValid: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthModel | null>(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check
    setUser(pb.authStore.model);
    setLoading(false);

    // Subscribe to auth changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = () => {
    pb.authStore.clear();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, isValid: pb.authStore.isValid }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
