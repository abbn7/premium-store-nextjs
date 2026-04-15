'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/types';
import { ProductCard } from '@/components/store/ProductCard';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(8);
      setProducts((data as Product[]) || []);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <section className="section-padding bg-background-light dark:bg-background-dark">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Curated
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="group hidden sm:flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground-light dark:hover:text-foreground-dark transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollAnimation>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted">
            <p>Featured products will appear here once added via the admin dashboard.</p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/products" className="btn-outline text-sm">
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
