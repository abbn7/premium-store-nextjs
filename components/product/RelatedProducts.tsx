'use client';

import { ProductCard } from '@/components/store/ProductCard';
import type { Product } from '@/types';
import { useRelatedProducts } from '@/hooks/useProducts';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

interface RelatedProductsProps {
  categoryId: string | null;
  currentProductId: string;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { products, loading } = useRelatedProducts(categoryId, currentProductId);

  if (loading) {
    return (
      <div className="py-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground-light dark:text-foreground-dark">
          You May Also Like
        </h2>
        <ProductGridSkeleton count={4} />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="py-12 border-t border-border-light dark:border-border-dark">
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground-light dark:text-foreground-dark">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
