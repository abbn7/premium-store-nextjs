import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/marketing/AnnouncementBar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { SocialProofPopup } from '@/components/marketing/SocialProofPopup';
import { NewsletterPopup } from '@/components/marketing/NewsletterPopup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Store — Premium Shopping Experience',
    template: '%s | Store',
  },
  description:
    'Discover curated premium products with exclusive deals. Free shipping on orders over $100. Shop the latest trends with confidence.',
  keywords: ['store', 'shopping', 'premium', 'fashion', 'ecommerce'],
  authors: [{ name: 'Abdelhaned Nada' }],
  creator: 'Abdelhaned Nada',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Store',
    title: 'Store — Premium Shopping Experience',
    description:
      'Discover curated premium products with exclusive deals. Free shipping on orders over $100.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store — Premium Shopping Experience',
    description:
      'Discover curated premium products with exclusive deals. Free shipping on orders over $100.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
          <SocialProofPopup />
          <NewsletterPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
