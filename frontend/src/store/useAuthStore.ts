import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '@/services/auth.service';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, displayName: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set: (partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)) => void) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true,

      initializeAuth: () => {
        const token = authService.getToken();
        const user = authService.getCurrentUser();
        
        if (token && user) {
          set({ 
            token, 
            user, 
            isAuthenticated: true, 
            loading: false 
          });
        } else {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            loading: false 
          });
        }
      },

      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const response = await authService.login({ email, password });
          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error: any) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (email: string, displayName: string, password: string) => {
        set({ loading: true });
        try {
          const response = await authService.register({ email, displayName, password });
          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error: any) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          loading: false 
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state: AuthState) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;