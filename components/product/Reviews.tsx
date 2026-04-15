'use client';

import { useState } from 'react';
import { StarRating } from '@/components/ui/StarRating';
import type { Review } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { ThumbsUp } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  // Demo breakdown
  const stats = {
    average: 4.8,
    total: 124,
    breakdown: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ]
  };

  const [visibleCount, setVisibleCount] = useState(3);

  // Mock initial reviews if none provided
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      id: '1',
      reviewer_name: 'Alex Johnson',
      rating: 5,
      comment: 'Absolutely phenomenal quality. It exceeded all my expectations and arrived so quickly!',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: '2',
      reviewer_name: 'Samantha W.',
      rating: 5,
      comment: 'I use this every single day now. Highly recommend to anyone considering it.',
      created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    },
    {
      id: '3',
      reviewer_name: 'Marcus D.',
      rating: 4,
      comment: 'Very good, styling is on point. Just wish it came in more color options.',
      created_at: new Date(Date.now() - 86400000 * 40).toISOString(),
    }
  ] as Review[];

  return (
    <div className="py-12 border-t border-border-light dark:border-border-dark mt-12">
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-center">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Stats Breakdown */}
        <div className="lg:col-span-4 bg-surface-light dark:bg-surface-dark p-8 rounded-2xl">
          <div className="text-center mb-6">
            <p className="font-display text-5xl font-black text-foreground-light dark:text-foreground-dark">{stats.average}</p>
            <div className="flex justify-center mt-2 mb-1">
              <StarRating rating={stats.average} size="lg" />
            </div>
            <p className="text-sm text-muted">Based on {stats.total} reviews</p>
          </div>

          <div className="space-y-3">
            {stats.breakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-sm">
                <span className="w-12 text-muted whitespace-nowrap">{item.stars} Stars</span>
                <div className="flex-1 h-2 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-muted">{item.percentage}%</span>
              </div>
            ))}
          </div>

          <button className="w-full btn-outline mt-8">
            Write a Review
          </button>
        </div>

        {/* Right Side: Review List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {displayReviews.slice(0, visibleCount).map((review) => (
            <div 
              key={review.id} 
              className="border-b border-border-light dark:border-border-dark pb-6 last:border-0"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-4 items-center">
                  <div className="h-10 w-10 bg-primary/10 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-primary dark:text-white">
                    {review.reviewer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground-light dark:text-foreground-dark leading-none mb-1 text-sm">
                      {review.reviewer_name}
                      <span className="ml-2 text-xs font-normal text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </p>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                </div>
                <span className="text-xs text-muted">
                  {formatRelativeTime(review.created_at)}
                </span>
              </div>
              <p className="text-sm text-muted mt-3 mb-4 leading-relaxed">
                {review.comment}
              </p>
              <button className="text-xs text-muted hover:text-accent font-medium flex items-center gap-1.5 transition-colors">
                <ThumbsUp className="h-3.5 w-3.5" />
                Helpful
              </button>
            </div>
          ))}

          {displayReviews.length > visibleCount && (
            <button 
              onClick={() => setVisibleCount((v) => v + 3)}
              className="text-sm font-semibold text-accent hover:text-accent-dark text-center py-4"
            >
              Load More Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
