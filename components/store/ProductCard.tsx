'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { StarRating } from '@/components/ui/StarRating';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = product.compare_at_price
    ? calculateDiscount(product.price, product.compare_at_price)
    : product.discount_percentage;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 10;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product, 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark hover:shadow-dramatic transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative aspect-product overflow-hidden bg-surface-light dark:bg-surface-dark">
          {/* Primary Image */}
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted/20" />
            </div>
          )}

          {/* Second Image on Hover */}
          {product.images?.[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="badge-sale">
                -{discount}%
              </span>
            )}
            {isOutOfStock && (
              <span className="badge-out">
                Sold Out
              </span>
            )}
            {product.is_featured && !isOutOfStock && !discount && (
              <span className="badge-new">
                Featured
              </span>
            )}
          </div>

          {/* Quick Actions — appear on hover */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-surface-card-dark shadow-medium hover:bg-accent hover:text-white transition-all"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-surface-card-dark shadow-medium hover:bg-accent hover:text-white transition-all"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Add Button — bottom */}
          {!isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleQuickAdd}
                className="flex w-full items-center justify-center gap-2 bg-primary dark:bg-white py-3 text-sm font-semibold text-white dark:text-black hover:bg-primary-light dark:hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                Quick Add
              </button>
            </div>
          )}

          {/* Low Stock Warning */}
          {isLowStock && (
            <div className="absolute bottom-3 left-3 right-3 group-hover:bottom-14 transition-all duration-300">
              <div className="rounded-full bg-accent/90 px-3 py-1 text-center text-[10px] font-semibold text-white backdrop-blur-sm">
                Only {product.stock} left!
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
              {product.category.name}
            </p>
          )}

          {/* Name */}
          <h3 className="font-medium text-sm text-foreground-light dark:text-foreground-dark line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Rating (placeholder) */}
          <div className="mt-1.5">
            <StarRating rating={4.5} size="sm" />
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-bold text-foreground-light dark:text-foreground-dark">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-bold text-accent">
                Save {discount}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
