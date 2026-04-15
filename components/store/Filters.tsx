'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { Category, ProductFilters } from '@/types';

interface FiltersProps {
  filters: ProductFilters;
  updateFilters: (filters: Partial<ProductFilters>) => void;
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Filters({
  filters,
  updateFilters,
  className = '',
  isMobileOpen = false,
  onMobileClose,
}: FiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const popularTags = ['New', 'Trending', 'Sustainable', 'Premium', 'Limited'];

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  };

  const FilterContent = () => (
    <div className="space-y-8 p-6 lg:p-0">
      {/* Categories */}
      <div>
        <h3 className="font-display font-semibold text-foreground-light dark:text-foreground-dark mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilters({ category: '' })}
            className={`flex w-full items-center justify-between text-sm transition-colors ${
              filters.category === ''
                ? 'font-semibold text-accent'
                : 'text-muted hover:text-foreground-light dark:hover:text-foreground-dark'
            }`}
          >
            <span>All Categories</span>
            {filters.category === '' && <Check className="h-4 w-4" />}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilters({ category: category.id })}
              className={`flex w-full items-center justify-between text-sm transition-colors ${
                filters.category === category.id
                  ? 'font-semibold text-accent'
                  : 'text-muted hover:text-foreground-light dark:hover:text-foreground-dark'
              }`}
            >
              <span>{category.name}</span>
              {filters.category === category.id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display font-semibold text-foreground-light dark:text-foreground-dark mb-4">
          Price Range
        </h3>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              min="0"
              value={filters.minPrice === 0 ? '' : filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: Number(e.target.value) || 0 })}
              placeholder="Min"
              className="w-full rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-2 pl-7 pr-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <span className="text-muted">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              min="0"
              value={filters.maxPrice === 10000 ? '' : filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) || 10000 })}
              placeholder="Max"
              className="w-full rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-2 pl-7 pr-3 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <h3 className="font-display font-semibold text-foreground-light dark:text-foreground-dark mb-4">
          Availability
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            filters.inStock
              ? 'bg-accent border-accent text-white'
              : 'border-border-light dark:border-border-dark bg-transparent group-hover:border-accent/50'
          }`}>
            {filters.inStock && <Check className="h-3.5 w-3.5" />}
          </div>
          <span className={`text-sm transition-colors ${
            filters.inStock
              ? 'text-foreground-light dark:text-foreground-dark font-medium'
              : 'text-muted'
          }`}>
            In Stock Only
          </span>
          <input
            type="checkbox"
            className="hidden"
            checked={filters.inStock}
            onChange={(e) => updateFilters({ inStock: e.target.checked })}
          />
        </label>
      </div>

      {/* Tags */}
      <div>
        <button
          onClick={() => setIsTagsExpanded(!isTagsExpanded)}
          className="flex w-full items-center justify-between font-display font-semibold text-foreground-light dark:text-foreground-dark mb-4 group"
        >
          <span>Popular Tags</span>
          <ChevronDown className={`h-4 w-4 text-muted transition-transform duration-300 ${isTagsExpanded ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {isTagsExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-1 pb-4">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      filters.tags.includes(tag)
                        ? 'bg-foreground-light text-white dark:bg-foreground-dark dark:text-black'
                        : 'bg-surface-light text-muted hover:bg-surface-dark dark:bg-surface-dark hover:text-foreground-light dark:hover:text-foreground-dark border border-border-light dark:border-border-dark'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Clear Filters */}
      <button
        onClick={() => updateFilters({
          category: '',
          minPrice: 0,
          maxPrice: 10000,
          tags: [],
          inStock: false
        })}
        className="w-full text-center text-sm font-medium text-accent hover:text-accent-dark transition-colors py-2"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop View */}
      <div className={`hidden lg:block w-64 flex-shrink-0 sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar scroll-pb-8 pr-6 border-r border-border-light dark:border-border-dark ${className}`}>
        <div className="flex items-center gap-2 mb-8">
          <Filter className="h-5 w-5 text-foreground-light dark:text-foreground-dark" />
          <h2 className="font-display text-xl font-bold text-foreground-light dark:text-foreground-dark">Filters</h2>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 z-[70] h-full w-[85%] max-w-sm bg-white dark:bg-surface-card-dark shadow-dramatic lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <span className="font-display text-lg font-bold">Filters</span>
                </div>
                <button
                  onClick={onMobileClose}
                  className="p-2 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                >
                  <X className="h-5 w-5 text-muted" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark">
                <button 
                  onClick={onMobileClose}
                  className="btn-primary w-full"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
