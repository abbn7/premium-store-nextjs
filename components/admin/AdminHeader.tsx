'use client';

import { Bell, Search, PanelLeftClose, PanelLeft, LogOut } from 'lucide-react';
import { adminLogout } from '@/app/actions/admin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminHeader() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Mobile state would be lifted in real app

  const handleLogout = async () => {
    await adminLogout();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="lg:hidden p-2 text-muted hover:text-accent transition-colors"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search orders, products, customers..." 
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-accent focus:bg-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-muted hover:text-accent transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent animate-ping flex"></span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent"></span>
        </button>
        <div className="h-6 w-px bg-border-light dark:bg-border-dark mx-2"></div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-red-500 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
