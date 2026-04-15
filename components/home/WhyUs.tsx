'use client';

import { Award, Gem, Zap, HeartHandshake } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimation';

const reasons = [
  {
    icon: Gem,
    title: 'Premium Quality',
    description: 'Every product is carefully selected and quality-checked before reaching you.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Lightning-fast shipping with real-time tracking on every order.',
  },
  {
    icon: Award,
    title: 'Authenticity Guaranteed',
    description: '100% authentic products with official warranty and certification.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Dedicated support team ensuring your satisfaction with every purchase.',
  },
];

export function WhyUs() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Why Us
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
              Why Shop With Us
            </h2>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={reason.title}>
                <div className="group text-center p-6 rounded-2xl bg-white dark:bg-surface-card-dark border border-border-light dark:border-border-dark hover:shadow-dramatic hover:border-accent/20 transition-all duration-500">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-gold/10 group-hover:from-accent/20 group-hover:to-gold/20 transition-all">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
