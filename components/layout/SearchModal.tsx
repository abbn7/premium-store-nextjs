'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .ilike('name', `%${query}%`)
        .limit(6);

      setResults((data as Product[]) || []);
      setLoading(false);
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [query, supabase]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-xl bg-white dark:bg-surface-card-dark rounded-2xl shadow-dramatic overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light dark:border-border-dark">
              <Search className="h-5 w-5 text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-foreground-light dark:text-foreground-dark placeholder:text-muted outline-none text-base"
              />
              {loading && <Loader2 className="h-4 w-4 text-muted animate-spin" />}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              >
                <X className="h-4 w-4 text-muted" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.length < 2 ? (
                <div className="px-5 py-8 text-center text-muted text-sm">
                  Type at least 2 characters to search...
                </div>
              ) : results.length === 0 && !loading ? (
                <div className="px-5 py-8 text-center text-muted text-sm">
                  No products found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="p-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
                    >
                      <div className="h-14 w-14 rounded-lg bg-surface-light dark:bg-surface-dark overflow-hidden flex-shrink-0">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground-light dark:text-foreground-dark truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-accent font-semibold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* View All */}
            {results.length > 0 && (
              <div className="border-t border-border-light dark:border-border-dark p-3">
                <Link
                  href={`/products?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                >
                  View all results
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
