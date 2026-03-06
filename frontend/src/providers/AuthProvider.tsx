'use client';

import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
};