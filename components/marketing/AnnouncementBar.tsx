'use client';

import { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative bg-gradient-to-r from-primary via-secondary to-primary dark:from-accent dark:via-accent-dark dark:to-accent overflow-hidden"
        >
          <div className="container-custom flex items-center justify-center py-2.5 px-8">
            <div className="flex items-center gap-2 text-center">
              <Megaphone className="h-3.5 w-3.5 text-gold flex-shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-white/90 tracking-wide">
                🔥 Free shipping on orders over $100 — Limited time offer!
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/40 hover:text-white/80 transition-colors"
              aria-label="Close announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
