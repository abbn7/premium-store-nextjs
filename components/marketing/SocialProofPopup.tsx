'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';

const names = [
  'Ahmed from Cairo',
  'Sara from Dubai',
  'Omar from Riyadh',
  'Maria from London',
  'James from New York',
  'Fatima from Casablanca',
  'Ali from Istanbul',
  'Emma from Paris',
  'David from Berlin',
  'Nour from Amman',
];

const products = [
  'Premium Leather Watch',
  'Classic Sunglasses',
  'Wireless Earbuds Pro',
  'Designer Backpack',
  'Smart Fitness Band',
  'Luxury Perfume Set',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomMinutes(): number {
  return Math.floor(Math.random() * 30) + 1;
}

export function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({
    name: '',
    product: '',
    minutes: 0,
  });

  useEffect(() => {
    const showNotification = () => {
      setNotification({
        name: getRandomItem(names),
        product: getRandomItem(products),
        minutes: getRandomMinutes(),
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // First notification after 15 seconds
    const firstTimer = setTimeout(showNotification, 15000);

    // Recurring notifications every 30-60 seconds
    const interval = setInterval(
      showNotification,
      30000 + Math.random() * 30000
    );

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-24 lg:bottom-6 left-4 z-50 max-w-xs"
        >
          <div className="flex items-start gap-3 rounded-xl bg-white dark:bg-surface-card-dark p-4 shadow-dramatic border border-border-light dark:border-border-dark">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
              <ShoppingBag className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground-light dark:text-foreground-dark">
                {notification.name}
              </p>
              <p className="text-xs text-muted mt-0.5">
                just purchased <span className="font-medium text-foreground-light dark:text-foreground-dark">{notification.product}</span>
              </p>
              <p className="text-[10px] text-muted/60 mt-1">
                {notification.minutes} min ago
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-0.5 text-muted/40 hover:text-muted transition-colors flex-shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
