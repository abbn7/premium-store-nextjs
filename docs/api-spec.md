# API Specification — Store E-Commerce Platform

## Base URL
`/api`

---

## Products

### GET /api/products
Fetch all active products with optional filters.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| category | string | - | Filter by category ID |
| minPrice | number | 0 | Minimum price filter |
| maxPrice | number | 10000 | Maximum price filter |
| inStock | boolean | false | Only show in-stock items |
| search | string | - | Search by product name |
| sortBy | string | newest | Sort: newest, price-asc, price-desc, name, popular |
| limit | number | 20 | Items per page |
| offset | number | 0 | Pagination offset |

**Response 200:**
```json
{
  "success": true,
  "data": [Product],
  "total": 50
}
```

### GET /api/products?slug=product-slug
Fetch single product by slug.

**Response 200:**
```json
{
  "success": true,
  "data": Product
}
```

### POST /api/products (Admin Only)
Create a new product.

**Body:** ProductFormData (JSON)

**Response 201:**
```json
{
  "success": true,
  "data": Product,
  "message": "Product created successfully"
}
```

### PUT /api/products (Admin Only)
Update an existing product.

**Body:** `{ id: string, ...ProductFormData }`

### DELETE /api/products?id=uuid (Admin Only)
Delete a product.

---

## Categories

### GET /api/categories
Fetch all active categories.

### POST /api/categories (Admin Only)
Create a new category.

### PUT /api/categories (Admin Only)
Update a category.

### DELETE /api/categories?id=uuid (Admin Only)
Delete a category.

---

## Reviews

### POST /api/reviews
Submit a product review (public).

**Body:**
```json
{
  "product_id": "uuid",
  "reviewer_name": "string",
  "rating": 1-5,
  "comment": "string"
}
```

---

## Newsletter

### POST /api/newsletter
Subscribe to newsletter.

**Body:**
```json
{
  "email": "string"
}
```

---

## Admin

### PUT /api/admin
Update site settings.

**Body:**
```json
{
  "action": "update_settings" | "approve_review" | "reject_review",
  "data": {}
}
```

---

## Upload

### POST /api/upload
Upload image to Supabase Storage.

**Body:** FormData with `file` field

**Response 200:**
```json
{
  "success": true,
  "data": {
    "url": "https://...supabase.co/storage/v1/object/public/..."
  }
}
```
