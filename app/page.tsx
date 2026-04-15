import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { MarqueeBanner } from '@/components/home/MarqueeBanner';
import { WhyUs } from '@/components/home/WhyUs';
import { BestSellers } from '@/components/home/BestSellers';
import { SocialProof } from '@/components/home/SocialProof';
import { NewArrivals } from '@/components/home/NewArrivals';
import { FlashSale } from '@/components/home/FlashSale';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <FeaturedProducts />
      <MarqueeBanner />
      <WhyUs />
      <BestSellers />
      <SocialProof />
      <NewArrivals />
      <FlashSale />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
