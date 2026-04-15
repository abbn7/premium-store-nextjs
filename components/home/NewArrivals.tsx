'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/types';
import { ProductCard } from '@/components/store/ProductCard';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(4);
      setProducts((data as Product[]) || []);
      setLoading(false);
    }
    fetch();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="section-padding bg-background-light dark:bg-background-dark">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Just Arrived
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products?sort=newest"
              className="group hidden sm:flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground-light dark:hover:text-foreground-dark transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
