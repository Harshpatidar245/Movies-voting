import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Mock user data
        const user = {
          id: '1',
          username: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);