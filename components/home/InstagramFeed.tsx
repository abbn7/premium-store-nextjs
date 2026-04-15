'use client';

import { Camera } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimation';

const placeholderImages = [
  { id: 1, gradient: 'from-rose-400 to-pink-500' },
  { id: 2, gradient: 'from-violet-400 to-purple-500' },
  { id: 3, gradient: 'from-amber-400 to-orange-500' },
  { id: 4, gradient: 'from-emerald-400 to-teal-500' },
  { id: 5, gradient: 'from-sky-400 to-blue-500' },
  { id: 6, gradient: 'from-fuchsia-400 to-pink-500' },
];

export function InstagramFeed() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Camera className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                @store
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
              Follow Our Journey
            </h2>
            <p className="mt-3 text-muted">
              Tag us in your photos for a chance to be featured
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {placeholderImages.map((img) => (
            <StaggerItem key={img.id}>
              <div className={`group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${img.gradient} cursor-pointer`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
