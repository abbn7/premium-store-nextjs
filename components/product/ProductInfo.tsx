'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { formatPrice, calculateDiscount, getSimulatedViewers, getSimulatedSoldToday } from '@/lib/utils';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { StarRating } from '@/components/ui/StarRating';
import { Countdown } from '@/components/marketing/Countdown';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const discount = product.compare_at_price
    ? calculateDiscount(product.price, product.compare_at_price)
    : product.discount_percentage;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 10;
  
  // Hardcoded for demo purposes since we don't have realtime viewers implemented
  const viewers = Math.max(10, getSimulatedViewers());
  const soldToday = Math.max(5, getSimulatedSoldToday());

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => Math.min(product.stock, q + 1));

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    openCart();
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {product.category && (
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            {product.category.name}
          </span>
        )}
        {discount > 0 && (
          <span className="badge-sale px-3 py-1">Save {discount}%</span>
        )}
        {product.is_featured && (
          <span className="badge-new px-3 py-1">Premium Edition</span>
        )}
      </div>

      {/* Title & Rating */}
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
          {product.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <StarRating rating={4.8} showValue />
          <span className="text-sm text-muted cursor-pointer hover:text-accent transition-colors underline underline-offset-4">
            See all reviews
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3 border-b border-border-light dark:border-border-dark pb-6">
        <span className="font-display text-4xl font-black text-accent">
          {formatPrice(product.price)}
        </span>
        {product.compare_at_price && product.compare_at_price > product.price && (
          <span className="text-xl text-muted line-through mb-1 flex items-center gap-2">
            {formatPrice(product.compare_at_price)}
          </span>
        )}
      </div>

      {/* Marketing / Urgency */}
      <div className="space-y-4 pt-2">
        {discount > 0 && (
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
            <p className="mb-2 text-sm font-semibold text-accent flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Flash Sale Ends In:
            </p>
            <Countdown hours={24} />
          </div>
        )}

        <div className="flex flex-col gap-2 text-sm text-muted">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <strong className="text-foreground-light dark:text-foreground-dark">{viewers}</strong> people are viewing this right now
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <strong className="text-foreground-light dark:text-foreground-dark">{soldToday}</strong> sold in the last 24 hours
          </p>
        </div>

        {isLowStock && (
          <p className="text-sm font-bold text-accent">
            Hurry! Only {product.stock} items left in stock.
          </p>
        )}
        {isOutOfStock && (
          <p className="text-sm font-bold text-foreground-light dark:text-foreground-dark">
            Currently Out of Stock.
          </p>
        )}
      </div>

      {/* Add To Cart Section */}
      <div className="space-y-4 pt-4 border-t border-border-light dark:border-border-dark">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark rounded-md w-full sm:w-32">
            <button
              onClick={handleDecrease}
              disabled={isOutOfStock || quantity <= 1}
              className="p-3 text-foreground-light dark:text-foreground-dark hover:text-accent disabled:opacity-50 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={isOutOfStock || quantity >= product.stock}
              className="p-3 text-foreground-light dark:text-foreground-dark hover:text-accent disabled:opacity-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 btn-primary shadow-dramatic"
          >
            <ShoppingBag className="h-5 w-5" />
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
        
        <button className="w-full btn-outline">
          Buy It Now
        </button>
      </div>

      {/* Product Description */}
      <div className="pt-6">
        <h3 className="font-display font-semibold mb-3">Product Description</h3>
        <p className="text-muted leading-relaxed text-sm">
          {product.description || "Premium quality product built with exceptional materials to ensure longevity and unparalleled style. Perfect for every occasion."}
        </p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-light dark:border-border-dark pt-6">
        <div className="flex flex-col items-center justify-center p-4 text-center rounded-lg bg-surface-light dark:bg-surface-dark">
          <Truck className="h-5 w-5 text-foreground-light dark:text-foreground-dark mb-2" />
          <span className="text-xs font-semibold">Free Express Delivery</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 text-center rounded-lg bg-surface-light dark:bg-surface-dark">
          <RefreshCcw className="h-5 w-5 text-foreground-light dark:text-foreground-dark mb-2" />
          <span className="text-xs font-semibold">30 Days Return</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 text-center rounded-lg bg-surface-light dark:bg-surface-dark">
          <ShieldCheck className="h-5 w-5 text-foreground-light dark:text-foreground-dark mb-2" />
          <span className="text-xs font-semibold">Secure Checkout</span>
        </div>
      </div>
    </div>
  );
}
