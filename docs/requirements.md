# Requirements — Store E-Commerce Platform

## Functional Requirements

### FR-01: Product Management
- Display products with images, name, description, price, discount, stock status
- Filter products by category, price range, tags, stock availability
- Sort products by newest, price (asc/desc), popularity, name
- Toggle between grid and list views
- Product detail page with image gallery, reviews, related products

### FR-02: Category System
- Hierarchical category organization
- Category pages with filtered product listings
- Category images for visual browsing

### FR-03: Shopping Cart
- Add/remove products from cart
- Update quantities
- Persistent cart (localStorage)
- Cart summary with subtotal, shipping, total
- Discount code input field (placeholder)
- Free shipping threshold indicator

### FR-04: User Reviews
- Submit product reviews (name, rating, comment)
- Star rating system (1-5)
- Review approval workflow (admin)
- Rating breakdown visualization
- Average rating display

### FR-05: Newsletter
- Email subscription form
- Popup subscription (after 10s delay, once)
- Subscriber management in admin

### FR-06: Admin Dashboard (Hidden)
- Secret access via footer button + email authentication
- Products CRUD with image upload to Supabase Storage
- Categories CRUD with image upload
- Site settings management (logo, hero, social links, announcement bar)
- Review moderation (approve/reject)
- Newsletter subscriber list
- Dashboard overview with stats

### FR-07: Search
- Global product search via modal
- Real-time search results

### FR-08: Dark Mode
- Light/Dark mode toggle
- AMOLED black dark mode
- Persistent preference (localStorage)

### FR-09: Social Proof & Marketing
- "X people viewing this" indicator
- "Ahmed from Cairo just bought..." notifications
- Counter-up animations for stats
- Trust badges throughout
- Countdown timer for sales
- Scarcity indicators ("Only X left!")

---

## Non-Functional Requirements

### NFR-01: Performance
- Lighthouse score > 90
- Lazy loading for images
- Skeleton loading states
- Dynamic imports for heavy components
- Optimized bundle size

### NFR-02: SEO
- Metadata for all pages (title, description, og:image)
- JSON-LD structured data (Product, Organization)
- Sitemap generation
- Robots.txt

### NFR-03: Responsive Design
- Mobile-first approach
- Breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
- Touch targets minimum 44×44px
- Mobile bottom navigation
- Swipeable carousels on mobile

### NFR-04: Security
- Supabase RLS on all tables
- Admin route protection (middleware)
- Input validation (Zod)
- Environment variable protection
- No exposed service keys on client

### NFR-05: Accessibility
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance

### NFR-06: Animations
- Page transitions (Framer Motion)
- Scroll-triggered animations
- Micro-interactions on buttons/cards
- Parallax effects
- Infinite marquee scroll
