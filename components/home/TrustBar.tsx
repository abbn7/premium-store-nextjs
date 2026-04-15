'use client';

import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

const trustItems = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected checkout' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here for you' },
];

export function TrustBar() {
  return (
    <section className="border-y border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
      <div className="container-custom py-8">
        <ScrollAnimation>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 justify-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 dark:bg-white/5 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary dark:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-light dark:text-foreground-dark">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
