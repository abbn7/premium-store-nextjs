'use client';

import { useCartStore } from '@/store/cart-store';
import { CartItems } from '@/components/store/CartItems';
import { RecentlyViewed } from '@/components/store/RecentlyViewed';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, ShieldCheck, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, total } = useCartStore();

  const shipping = total > 100 ? 0 : 15;
  const grandTotal = total + shipping;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pt-12 pb-24">
      <div className="container-custom">
        <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground-light dark:text-foreground-dark mb-10">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Cart Area */}
          <div className="lg:col-span-8">
            <CartItems />
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-4">
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 sm:p-8 border border-border-light dark:border-border-dark sticky top-28">
                <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground-light dark:text-foreground-dark">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-medium text-green-500 uppercase tracking-widest text-xs">Free</span>
                    ) : (
                      <span className="font-medium text-foreground-light dark:text-foreground-dark">{formatPrice(shipping)}</span>
                    )}
                  </div>
                  {shipping > 0 && (
                    <div className="text-xs text-accent">
                      Spend {formatPrice(100 - total)} more for free shipping
                    </div>
                  )}
                  {/* Progress Bar for Free Shipping */}
                  {shipping > 0 && (
                    <div className="h-1.5 w-full bg-border-light dark:bg-border-dark rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full bg-accent rounded-full" 
                        style={{ width: `${Math.min(100, (total / 100) * 100)}%` }} 
                      />
                    </div>
                  )}
                </div>

                <div className="border-t border-border-light dark:border-border-dark pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg text-foreground-light dark:text-foreground-dark">Total</span>
                    <span className="font-display font-black text-3xl text-accent">{formatPrice(grandTotal)}</span>
                  </div>
                  <p className="text-xs text-muted text-right mt-1">Including VAT</p>
                </div>

                <button className="btn-primary w-full py-4 text-base shadow-dramatic flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted">
                    <ShieldCheck className="h-4 w-4" />
                    Secure Checkout Guaranteed
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted">
                    <Lock className="h-4 w-4" />
                    256-bit SSL Encryption
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted">
                    <CreditCard className="h-4 w-4" />
                    All major cards accepted
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
}
