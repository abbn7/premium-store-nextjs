'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Star, ShoppingBag, ThumbsUp } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

function CounterUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers' },
  { icon: ShoppingBag, value: 500, suffix: '+', label: 'Products Sold' },
  { icon: Star, value: 4.9, suffix: '', label: 'Average Rating', isDecimal: true },
  { icon: ThumbsUp, value: 99, suffix: '%', label: 'Satisfaction Rate' },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Absolutely love the quality! Best online shopping experience ever.',
    rating: 5,
    avatar: 'S',
  },
  {
    name: 'James K.',
    text: 'Fast delivery and amazing customer service. Highly recommend!',
    rating: 5,
    avatar: 'J',
  },
  {
    name: 'Nour A.',
    text: 'The products exceeded my expectations. Will definitely order again.',
    rating: 5,
    avatar: 'N',
  },
];

export function SocialProof() {
  return (
    <section className="section-padding bg-background-light dark:bg-background-dark">
      <div className="container-custom">
        {/* Stats */}
        <ScrollAnimation>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-white dark:bg-surface-card-dark border border-border-light dark:border-border-dark"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="font-display text-3xl sm:text-4xl font-black text-foreground-light dark:text-foreground-dark">
                    {stat.isDecimal ? (
                      <span>{stat.value}</span>
                    ) : (
                      <CounterUp target={stat.value} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollAnimation>

        {/* Testimonials */}
        <ScrollAnimation>
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Testimonials
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
              What Our Customers Say
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollAnimation key={t.name} delay={i * 0.1}>
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-card-dark border border-border-light dark:border-border-dark hover:shadow-medium transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 text-gold fill-gold"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-gold text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-light dark:text-foreground-dark">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
