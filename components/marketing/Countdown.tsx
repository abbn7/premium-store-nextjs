'use client';

import { useState, useEffect, useRef } from 'react';

interface CountdownProps {
  targetDate?: Date;
  hours?: number;
  className?: string;
}

export function Countdown({ targetDate, hours = 24, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const endTimeRef = useRef<number>(0);

  useEffect(() => {
    if (targetDate) {
      endTimeRef.current = targetDate.getTime();
    } else {
      // Use a fixed end time based on hours from now, stored in localStorage
      const storedEnd = localStorage.getItem('store-countdown-end');
      if (storedEnd) {
        endTimeRef.current = parseInt(storedEnd, 10);
      } else {
        endTimeRef.current = Date.now() + hours * 60 * 60 * 1000;
        localStorage.setItem('store-countdown-end', endTimeRef.current.toString());
      }
    }

    const tick = () => {
      const diff = Math.max(0, endTimeRef.current - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours: h, minutes: m, seconds: s });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate, hours]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TimeBlock value={pad(timeLeft.hours)} label="HRS" />
      <span className="text-2xl font-bold text-accent animate-pulse">:</span>
      <TimeBlock value={pad(timeLeft.minutes)} label="MIN" />
      <span className="text-2xl font-bold text-accent animate-pulse">:</span>
      <TimeBlock value={pad(timeLeft.seconds)} label="SEC" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary dark:bg-surface-card-dark border border-border-light dark:border-border-dark shadow-medium">
        <span className="font-display text-xl sm:text-2xl font-bold text-white dark:text-foreground-dark tabular-nums">
          {value}
        </span>
      </div>
      <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}
