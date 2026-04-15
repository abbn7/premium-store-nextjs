'use client';

import { motion } from 'framer-motion';

const words = [
  'PREMIUM', '✦', 'QUALITY', '✦', 'AUTHENTIC', '✦',
  'EXCLUSIVE', '✦', 'LUXURY', '✦', 'CURATED', '✦',
  'TRENDY', '✦', 'STYLE', '✦', 'ELEGANT', '✦',
  'PREMIUM', '✦', 'QUALITY', '✦', 'AUTHENTIC', '✦',
  'EXCLUSIVE', '✦', 'LUXURY', '✦', 'CURATED', '✦',
  'TRENDY', '✦', 'STYLE', '✦', 'ELEGANT', '✦',
];

export function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden bg-primary dark:bg-surface-dark py-5 border-y border-border-light dark:border-border-dark">
      <div className="flex">
        <motion.div
          animate={{ x: '-50%' }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 30,
              ease: 'linear',
            },
          }}
          className="flex shrink-0 items-center gap-8"
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`whitespace-nowrap text-sm font-semibold tracking-[0.2em] ${
                word === '✦'
                  ? 'text-accent text-xs'
                  : 'text-white/70 dark:text-foreground-dark/70'
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
