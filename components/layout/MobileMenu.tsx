'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, ShoppingBag, Tag, Mail, Info, ChevronRight } from 'lucide-react';

const menuLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop All', href: '/products', icon: ShoppingBag },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-[70] h-full w-[85%] max-w-sm bg-white dark:bg-background-dark shadow-dramatic overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
              <span className="font-display text-xl font-black text-foreground-light dark:text-foreground-dark">
                STORE
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-foreground-light dark:text-foreground-dark" />
              </button>
            </div>

            {/* Links */}
            <nav className="p-4">
              {menuLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-4 rounded-lg text-foreground-light dark:text-foreground-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border-light dark:border-border-dark bg-white dark:bg-background-dark">
              <Link
                href="/products"
                onClick={onClose}
                className="btn-accent w-full flex items-center justify-center gap-2"
              >
                <Tag className="h-4 w-4" />
                Shop Now
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
