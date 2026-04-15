# Database Schema — Store E-Commerce Platform

## Tables

### products
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| name | TEXT | NOT NULL | Product name |
| slug | TEXT | UNIQUE NOT NULL | URL-friendly identifier |
| description | TEXT | nullable | Product description |
| price | NUMERIC(10,2) | NOT NULL | Current selling price |
| compare_at_price | NUMERIC(10,2) | nullable | Original price before discount |
| discount_percentage | INT | DEFAULT 0 | Discount percentage |
| images | TEXT[] | NOT NULL | Array of Supabase Storage URLs |
| category_id | UUID | FK → categories(id) | Category reference |
| tags | TEXT[] | nullable | Product tags array |
| stock | INT | DEFAULT 0 | Available stock count |
| is_featured | BOOLEAN | DEFAULT false | Show in featured section |
| is_active | BOOLEAN | DEFAULT true | Product visibility |
| metadata | JSONB | nullable | Additional data |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:** slug (UNIQUE), category_id, is_featured, is_active, created_at

---

### categories
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| name | TEXT | NOT NULL | Category name |
| slug | TEXT | UNIQUE NOT NULL | URL-friendly identifier |
| image_url | TEXT | nullable | Category image URL |
| display_order | INT | DEFAULT 0 | Sort order for display |
| is_active | BOOLEAN | DEFAULT true | Category visibility |

**Indexes:** slug (UNIQUE), display_order

---

### site_settings
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| key | TEXT | PK | Setting identifier |
| value | JSONB | NOT NULL | Setting value (JSON) |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Keys used:** store_name, logo_url, hero, announcement_bar, social_links, contact_info, footer_text, copyright_text

---

### reviews
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| product_id | UUID | FK → products(id) ON DELETE CASCADE | Product reference |
| reviewer_name | TEXT | NOT NULL | Reviewer display name |
| rating | INT | CHECK (1-5) | Star rating |
| comment | TEXT | nullable | Review text |
| is_approved | BOOLEAN | DEFAULT false | Moderation status |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Submission timestamp |

**Indexes:** product_id, is_approved, created_at

---

### newsletter_subscribers
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| email | TEXT | UNIQUE NOT NULL | Subscriber email |
| subscribed_at | TIMESTAMPTZ | DEFAULT NOW() | Subscription timestamp |

**Indexes:** email (UNIQUE)

---

## Row Level Security (RLS)

All tables have RLS enabled:
- **products, categories, site_settings:** `SELECT` allowed for anonymous (public read)
- **reviews:** `SELECT` of approved reviews for anonymous; `INSERT` for anonymous (submit review)
- **newsletter_subscribers:** `INSERT` for anonymous (subscribe)
- **All tables:** Full access via `service_role` key (admin operations)

## Relationships
```
categories (1) ──→ (N) products
products   (1) ──→ (N) reviews
```
