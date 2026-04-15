import { Award, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Premium Store',
  description: 'Our mission is to provide the highest quality products with unparalleled customer service.',
};

export default function AboutPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-primary dark:bg-surface-dark flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4 block">Our Story</span>
          <h1 className="font-display text-4xl sm:text-6xl font-black mb-6 leading-tight">
            Redefining the <span className="text-gradient">Standard</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed">
            We believe that premium quality shouldn&apos;t be a luxury. It should be the standard. We are here to change the way you shop online.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark block">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2023', label: 'Founded' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '100%', label: 'Authentic Quality' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl sm:text-4xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-sm font-medium uppercase tracking-wider text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-muted text-lg">
              Everything we do is driven by these core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Uncompromised Quality',
                desc: 'We source only the finest materials and partner with top manufacturers.'
              },
              {
                icon: HeartHandshake,
                title: 'Customer Obsession',
                desc: 'Your satisfaction isn\'t just our goal, it\'s our guarantee.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                desc: 'Constantly seeking new ways to improve your shopping experience.'
              },
              {
                icon: ShieldCheck,
                title: 'Absolute Integrity',
                desc: 'Transparency and honesty in every interaction and transaction.'
              }
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="p-8 rounded-2xl bg-white dark:bg-surface-card-dark border border-border-light dark:border-border-dark shadow-medium">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-light dark:text-foreground-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
