'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { Product, Category, Review, NewsletterSubscriber, SiteSettings } from '@/types';

const supabase = createClient();

export function useAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes, reviewsRes, subscribersRes, settingsRes] =
        await Promise.all([
          supabase.from('products').select('*, category:categories(*)').order('created_at', { ascending: false }),
          supabase.from('categories').select('*').order('display_order', { ascending: true }),
          supabase.from('reviews').select('*, product:products(name, slug)').order('created_at', { ascending: false }),
          supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
          supabase.from('site_settings').select('*'),
        ]);

      setProducts((productsRes.data as Product[]) || []);
      setCategories((categoriesRes.data as Category[]) || []);
      setReviews((reviewsRes.data as Review[]) || []);
      setSubscribers((subscribersRes.data as NewsletterSubscriber[]) || []);

      // Parse site settings from key-value rows into a single object
      if (settingsRes.data) {
        const settingsObj: Record<string, unknown> = {};
        settingsRes.data.forEach((row: { key: string; value: unknown }) => {
          settingsObj[row.key] = row.value;
        });
        setSettings(settingsObj as unknown as SiteSettings);
      }
    } catch (err) {
      // Error handling silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    products,
    categories,
    reviews,
    subscribers,
    settings,
    loading,
    refetch: fetchAll,
  };
}
