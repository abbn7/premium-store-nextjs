# Deployment Guide — Store E-Commerce Platform

## Prerequisites
- GitHub account
- Vercel account (vercel.com)
- Supabase project (supabase.com)

---

## Step 1: Supabase Setup

### 1.1 Create Database Tables
1. Go to Supabase Dashboard → SQL Editor
2. Paste the migration SQL (from `docs/migrations.sql`)
3. Click "Run"

### 1.2 Create Storage Bucket
1. Go to Storage → New Bucket
2. Name: `images`
3. Set as **Public** bucket
4. Add policy: Allow public read access

### 1.3 Get API Keys
1. Go to Settings → API
2. Copy: Project URL, anon key, service_role key
3. Go to Settings → Database
4. Copy: Connection string (URI)

---

## Step 2: GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Store e-commerce platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/store.git
git push -u origin main
```

---

## Step 3: Vercel Deployment

### 3.1 Import Project
1. Go to vercel.com → New Project
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)

### 3.2 Environment Variables
Add these in Vercel → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase anon key |
| SUPABASE_SERVICE_ROLE_KEY | Your Supabase service role key |
| SUPABASE_JWT_SECRET | Your JWT secret |

### 3.3 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site is live at `your-project.vercel.app`

---

## Step 4: Custom Domain (Optional)
1. Go to Vercel → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Step 5: Admin Access
1. Go to your deployed site
2. Scroll to the bottom (Footer)
3. Click the small invisible button (8×8px, near the developer credit)
4. Enter admin email: `admin123321.com`
5. You'll be redirected to the admin dashboard

---

## Post-Deployment Checklist
- [ ] Verify all pages load correctly
- [ ] Test dark mode toggle
- [ ] Test admin login and dashboard
- [ ] Add initial products via admin dashboard
- [ ] Add categories via admin dashboard
- [ ] Update site settings (logo, hero, social links)
- [ ] Test newsletter subscription
- [ ] Test review submission
- [ ] Verify mobile responsiveness
- [ ] Check SEO metadata (use Google Structured Data Testing Tool)
