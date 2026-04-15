import { ProductDetailSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <ProductDetailSkeleton />
    </div>
  );
}
