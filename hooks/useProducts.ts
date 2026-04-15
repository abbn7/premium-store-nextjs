import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import type { Product, ProductFilters, SortOption } from '@/types';

interface UseProductsOptions {
  category?: string;
  search?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    category: options.category || '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest',
    inStock: false,
    tags: [],
    search: options.search || '',
  });

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const supabase = createClient();
      
      let query = supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true);

      // Apply Filters
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters.minPrice > 0) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters.maxPrice < 10000) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters.inStock) {
        query = query.gt('stock', 0);
      }

      // Apply Sorting
      switch (filters.sortBy) {
        case 'popular':
          query = query.order('created_at', { ascending: false });
          break;
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data } = await query;
      
      let finalData = (data as Product[]) || [];
      if (filters.tags.length > 0) {
         finalData = finalData.filter(p => 
           filters.tags.some(tag => p.tags?.includes(tag))
         );
      }

      setProducts(finalData);
      setLoading(false);
    }
    
    const timer = setTimeout(() => {
      fetch();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filters]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const setSortBy = (sort: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy: sort }));
  };

  return {
    products,
    loading,
    filters,
    updateFilters,
    setSortBy,
  };
}

export function useRelatedProducts(categoryId: string | null, currentProductId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    async function fetch() {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .eq('category_id', categoryId)
        .neq('id', currentProductId)
        .limit(4);

      setProducts((data as Product[]) || []);
      setLoading(false);
    }
    fetch();
  }, [categoryId, currentProductId]);

  return { products, loading };
}
