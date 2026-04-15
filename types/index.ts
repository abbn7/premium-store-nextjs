// ═══════════════════════════════════════════
// TypeScript Type Definitions — Store
// ═══════════════════════════════════════════

// ── Product ──
export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  discount_percentage: number;
  images: string[];
  category_id: string | null;
  tags: string[] | null;
  stock: number;
  is_featured: boolean;
  is_active: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  // Joined
  category?: Category;
  reviews?: Review[];
}

export interface ProductFormData {
  name: string;
  slug: string;
  sku?: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  discount_percentage: number;
  images: string[];
  category_id: string;
  tags: string[];
  stock: number;
  is_featured: boolean;
  is_active: boolean;
  metadata: Record<string, unknown> | null;
}

// ── Category ──
export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

// ── Review ──
export interface Review {
  id: string;
  product_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
  // Joined
  product?: Product;
}

export interface ReviewFormData {
  product_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
}

// ── Newsletter ──
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

// ── Cart ──
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// ── Site Settings ──
export interface SiteSettings {
  store_name: string;
  logo_url: string;
  hero: HeroSettings;
  announcement_bar: AnnouncementBarSettings;
  social_links: SocialLinks;
  contact_info: ContactInfo;
  footer_text: string;
  copyright_text: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  background_image: string;
}

export interface AnnouncementBarSettings {
  text: string;
  is_active: boolean;
  bg_color: string;
  text_color: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  twitter: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

// ── Site Setting Row ──
export interface SiteSettingRow {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

// ── Admin ──
export interface AdminState {
  isAuthenticated: boolean;
  activeTab: AdminTab;
  login: (email: string) => boolean;
  logout: () => void;
  setActiveTab: (tab: AdminTab) => void;
}

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'settings'
  | 'reviews'
  | 'newsletter';

// ── Theme ──
export interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// ── API Response ──
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ── Filters ──
export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
  inStock: boolean;
  sortBy: SortOption;
  search: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name' | 'popular';

// ── View Mode ──
export type ViewMode = 'grid' | 'list';

// ── Pagination ──
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ── Recently Viewed ──
export interface RecentlyViewed {
  productId: string;
  viewedAt: number;
}
