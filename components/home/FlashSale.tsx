'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/types';
import { ProductCard } from '@/components/store/ProductCard';
import { Countdown } from '@/components/marketing/Countdown';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

export function FlashSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .gt('discount_percentage', 0)
        .order('discount_percentage', { ascending: false })
        .limit(4);
      setProducts((data as Product[]) || []);
      setLoading(false);
    }
    fetch();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-primary/5 to-accent/5 dark:from-accent/5 dark:to-transparent">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-accent fill-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Limited Time
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
              Flash Sale
            </h2>
            <div className="flex justify-center">
              <Countdown hours={48} />
            </div>
            <p className="mt-4 text-sm text-muted">
              Hurry up! These deals won&apos;t last forever.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
