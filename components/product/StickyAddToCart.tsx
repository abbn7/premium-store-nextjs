'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface StickyAddToCartProps {
  product: Product;
}

export function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolling past 500px on mobile
      if (window.scrollY > 500 && window.innerWidth < 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, 1);
    openCart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-[60px] left-0 right-0 z-40 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-border-light dark:border-border-dark p-3 lg:hidden shadow-dramatic"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {product.images?.[0] && (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="h-10 w-10 object-cover rounded-md flex-shrink-0"
                />
              )}
              <div className="truncate">
                <p className="text-xs font-semibold truncate text-foreground-light dark:text-foreground-dark">
                  {product.name}
                </p>
                <p className="text-xs font-bold text-accent">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn-accent px-4 py-2 h-10 flex-shrink-0 text-sm whitespace-nowrap"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {isOutOfStock ? 'Sold Out' : 'Add'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
