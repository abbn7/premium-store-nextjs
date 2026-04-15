'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { Category } from '@/types';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimation';

export function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(6);
      setCategories((data as Category[]) || []);
    }
    fetch();
  }, []);

  // Fallback categories for when DB is empty
  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Electronics', slug: 'electronics', image_url: null, display_order: 0, is_active: true },
    { id: '2', name: 'Fashion', slug: 'fashion', image_url: null, display_order: 1, is_active: true },
    { id: '3', name: 'Accessories', slug: 'accessories', image_url: null, display_order: 2, is_active: true },
    { id: '4', name: 'Home & Living', slug: 'home-living', image_url: null, display_order: 3, is_active: true },
  ];

  const gradients = [
    'from-violet-600 to-indigo-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-sky-500 to-blue-600',
    'from-fuchsia-500 to-purple-600',
  ];

  return (
    <section className="section-padding bg-background-light dark:bg-background-dark">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Categories
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
              Shop by Category
            </h2>
            <p className="mt-3 text-muted max-w-md mx-auto">
              Browse our curated collections and find exactly what you&apos;re looking for.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((category, i) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/products?category=${category.slug}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl p-5"
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-500 group-hover:scale-105`} />
                
                {/* Image overlay if exists */}
                {category.image_url && (
                  <div className="absolute inset-0">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 w-full">
                  <h3 className="font-display text-lg font-bold text-white">
                    {category.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
