'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter as FilterIcon } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Filters } from '@/components/store/Filters';
import { ProductGrid } from '@/components/store/ProductGrid';
import type { ViewMode } from '@/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  
  const { products, loading, filters, updateFilters, setSortBy } = useProducts({
    category: categoryParam,
    search: searchParam,
  });

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      {/* Page Header */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-12 sm:py-16">
        <div className="container-custom">
          <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground-light dark:text-foreground-dark text-center">
            {searchParam ? `Search Results for "${searchParam}"` : 'All Products'}
          </h1>
          {categoryParam && !searchParam && (
            <p className="mt-4 text-center text-muted uppercase tracking-[0.2em] text-sm">
              Exploring {categoryParam}
            </p>
          )}
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex justify-end">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 btn-outline py-2 px-4 text-sm"
          >
            <FilterIcon className="h-4 w-4" />
            Show Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Filters */}
          <Filters
            filters={filters}
            updateFilters={updateFilters}
            isMobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Product Grid Area */}
          <ProductGrid
            products={products}
            loading={loading}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={filters.sortBy}
            setSortBy={setSortBy}
            totalProducts={products.length} // Should come from API pagination in Real world
          />
        </div>
      </div>
    </div>
  );
}
