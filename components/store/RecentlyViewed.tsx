'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/store/ProductCard';
import type { Product } from '@/types';
import { createClient } from '@/lib/supabase';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

export function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app we'd read viewed IDs from localStorage and fetch them.
    // For demo, we just fetch 4 random featured products
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .limit(4);
      if (data) setProducts(data as Product[]);
    }
    fetch();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-16">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground-light dark:text-foreground-dark">
              Recently Viewed
            </h2>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
