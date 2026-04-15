'use client';

import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CartItems() {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark">
          <ShoppingBag className="h-10 w-10 text-muted" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted mb-8 max-w-sm">
          Looks like you haven&apos;t added anything to your cart yet. Discover our premium collections and find something you love.
        </p>
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 sm:gap-6 border-b border-border-light dark:border-border-dark pb-6">
          {/* Image */}
          <Link href={`/products/${item.slug}`} className="flex-shrink-0">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              {item.images?.[0] ? (
                <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <ShoppingBag className="h-8 w-8 text-muted m-auto h-full" />
              )}
            </div>
          </Link>

          {/* Details */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between items-start gap-4">
              <div>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-medium text-foreground-light dark:text-foreground-dark hover:text-accent transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                {item.category && (
                  <p className="text-xs text-muted mt-1 uppercase tracking-wider">{item.category.name}</p>
                )}
              </div>
              <p className="font-bold text-accent whitespace-nowrap">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark rounded-md">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-foreground-light dark:text-foreground-dark hover:text-accent transition-colors disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-foreground-light dark:text-foreground-dark hover:text-accent transition-colors disabled:opacity-50"
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
