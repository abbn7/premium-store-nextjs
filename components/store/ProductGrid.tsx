'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import type { Product, ViewMode, SortOption } from '@/types';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  totalProducts: number;
}

export function ProductGrid({
  products,
  loading,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  totalProducts,
}: ProductGridProps) {
  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <p className="text-sm text-muted">
          Showing <span className="font-bold text-foreground-light dark:text-foreground-dark">{products.length}</span> of {totalProducts} products
        </p>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Sort Dropdown */}
          <div className="relative min-w-[160px] flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full appearance-none rounded-md border border-border-light dark:border-border-dark bg-transparent py-2 pl-4 pr-10 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* View Toggles */}
          <div className="hidden sm:flex items-center gap-1 bg-surface-light dark:bg-surface-dark p-1 rounded-md border border-border-light dark:border-border-dark">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-surface-card-dark text-foreground-light dark:text-foreground-dark shadow-sm'
                  : 'text-muted hover:text-foreground-light dark:hover:text-foreground-dark'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-surface-card-dark text-foreground-light dark:text-foreground-dark shadow-sm'
                  : 'text-muted hover:text-foreground-light dark:hover:text-foreground-dark'
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length > 0 ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                : 'flex flex-col gap-4' // List view styling can be enhanced in ProductCard if needed or wrapped differently
            }
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark">
            <LayoutGrid className="h-8 w-8 text-muted" />
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-foreground-light dark:text-foreground-dark">
            No products found
          </h3>
          <p className="text-muted max-w-sm">
            We couldn&apos;t find any products matching your current filters. Try removing some filters to see more results.
          </p>
        </motion.div>
      )}
    </div>
  );
}
