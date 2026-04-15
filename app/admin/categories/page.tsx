'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import type { Category } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (data) setCategories(data as Category[]);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground-light dark:text-foreground-dark">
            Categories
          </h1>
          <p className="text-sm text-muted mt-1">Organize your products into categories.</p>
        </div>
        <button className="btn-primary shadow-dramatic flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted animate-pulse">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted">
            No categories found. Create your first category.
          </div>
        ) : (
          categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white dark:bg-surface-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark flex flex-col hover:shadow-medium transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-lg font-bold text-foreground-light dark:text-foreground-dark">
                  {category.name}
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                  category.is_active 
                    ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                    : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                }`}>
                  {category.is_active ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                  {category.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
              
              <div className="text-sm text-muted mb-6 flex-1">
                <p>Slug: <span className="font-mono text-xs">{category.slug}</span></p>
                <p>Order: {category.display_order}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                <button className="btn-outline px-3 py-1.5 text-xs flex items-center gap-1.5">
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button className="p-1.5 text-muted hover:text-red-500 transition-colors rounded-md border border-transparent hover:border-red-200 dark:hover:border-red-900">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
