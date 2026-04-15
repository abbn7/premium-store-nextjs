'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminTab } from '@/types';

const ADMIN_EMAIL = 'admin123321.com';

interface AdminState {
  isAuthenticated: boolean;
  activeTab: AdminTab;
  login: (email: string) => boolean;
  logout: () => void;
  setActiveTab: (tab: AdminTab) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      activeTab: 'dashboard',

      login: (email: string) => {
        if (email === ADMIN_EMAIL) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, activeTab: 'dashboard' });
      },

      setActiveTab: (tab: AdminTab) => {
        set({ activeTab: tab });
      },
    }),
    {
      name: 'store-admin',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
