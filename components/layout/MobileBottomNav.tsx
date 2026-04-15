'use client';

import Link from 'next/link';
import { Home, Search, ShoppingBag, Grid3X3 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop', href: '/products', icon: Grid3X3 },
  { name: 'Search', href: '/products?search=true', icon: Search },
  { name: 'Cart', href: '/cart', icon: ShoppingBag },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-light dark:border-border-dark bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl lg:hidden safe-area-bottom">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname?.startsWith(item.href.split('?')[0]);

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px]"
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-muted hover:text-foreground-light dark:hover:text-foreground-dark'
                  }`}
                />
                {item.name === 'Cart' && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
