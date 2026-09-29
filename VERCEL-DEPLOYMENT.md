# Vercel Deployment Guide

Complete guide to deploy this portfolio on Vercel with cloud database.

---

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com/)
- Cloud PostgreSQL database (Neon or Vercel Postgres)

---

## Step 1: Set Up Cloud Database

### Option A: Neon PostgreSQL (Recommended)

1. Go to https://neon.tech/ and sign up
2. Create a new project
3. Copy the **pooled connection string** (important for serverless!)
4. It looks like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`

### Option B: Vercel Postgres

1. Go to https://vercel.com/dashboard
2. Navigate to Storage → Create Database
3. Select Postgres
4. Vercel will provide the connection string automatically

---

## Step 2: Test Database Locally

Before deploying, test the cloud database locally:

1. **Update `.env.local`** with your Neon/Vercel Postgres connection string:
   ```env
   DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=require"
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Apply migrations**:
   ```bash
   bunx drizzle-kit migrate
   ```

4. **Seed the database** (only once):
   ```bash
   bun run db:seed
   ```

5. **Test locally**:
   ```bash
   bun run dev
   ```
   Visit http://localhost:4000 - should work with cloud database

---

## Step 3: Push to GitHub

1. **Initialize git** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "my-portfolio")
   - Don't initialize with README (you already have one)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/yourusername/my-portfolio.git
   git branch -M master
   git push -u origin master
   ```

---

## Step 4: Deploy to Vercel

### Import Project

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js

### Configure Build Settings

Vercel should auto-detect these, but verify:
- **Framework Preset**: Next.js
- **Build Command**: `bun run vercel-build` (uses bun, includes migration)
- **Output Directory**: `.next`
- **Install Command**: `bun install`

### Add Environment Variables

Add these in Vercel project settings → Environment Variables:

#### Required Variables

```env
# Database (use your Neon or Vercel Postgres connection string)
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require

# Auth Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-generated-secret-here

# GitHub OAuth (create at: https://github.com/settings/developers)
# IMPORTANT: Update callback URL to your Vercel domain!
AUTH_GITHUB_ID=your-github-oauth-client-id
AUTH_GITHUB_SECRET=your-github-oauth-secret

# Admin Access
ADMIN_GITHUB_LOGIN=your-github-username

# GitHub API Token (recommended for higher rate limits)
GITHUB_TOKEN=ghp_your-personal-access-token

# Site URL (use your Vercel domain)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

#### Optional Production Variables

```env
# Vercel Blob (for image uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_token

# Resend (for testimonial email notifications)
RESEND_API_KEY=re_your-api-key
RESEND_FROM_EMAIL=Portfolio <noreply@yourdomain.com>
CONTACT_EMAIL=your-email@example.com

# Revalidation
REVALIDATE_SECRET=your-revalidate-secret

# Analytics
NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN=your-token
```

---

## Step 5: Update GitHub OAuth App

**CRITICAL**: Update your GitHub OAuth App with production URLs:

1. Go to https://github.com/settings/developers
2. Select your OAuth App
3. Update:
   - **Homepage URL**: `https://your-project.vercel.app`
   - **Authorization callback URL**: `https://your-project.vercel.app/api/auth/callback/github`

Or create a separate OAuth App for production (recommended).

---

## Step 6: Deploy

1. Click **Deploy** in Vercel
2. Wait for the build to complete
3. Vercel will run:
   - `bun install`
   - `bun run vercel-build` (which runs `drizzle-kit migrate` then `next build --webpack`)

---

## Step 7: Verify Deployment

1. **Visit your site**: `https://your-project.vercel.app`
2. **Check homepage**: Should show seeded content
3. **Test admin login**: Go to `/admin` and sign in with GitHub
4. **Verify admin access**: Should see CRUD dashboard

---

## Step 8: Set Up Vercel Blob (Optional - For Image Uploads)

To enable image uploads in the admin panel:

1. Go to Vercel Dashboard → Storage
2. Create a new Blob Store
3. Connect it to your project
4. Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to environment variables
5. Redeploy your project

Now you can upload:
- Profile avatar
- Skill icons
- Project cover images and screenshots
- Testimonial avatars

---

## Step 9: Set Up Email Notifications (Optional)

To get notified when someone submits a testimonial:

1. Sign up at https://resend.com/
2. Verify a domain (or use their test domain for development)
3. Create an API key
4. Add to Vercel environment variables:
   ```env
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=Portfolio <noreply@yourdomain.com>
   CONTACT_EMAIL=your-email@example.com
   ```
5. Redeploy

---

## Updating Your Site

### Content Updates (No Deployment Needed)

Edit content through `/admin` - changes are live immediately thanks to ISR revalidation.

### Code Updates

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# Vercel automatically deploys on push to master
```

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update environment variables:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```
5. Update GitHub OAuth callback URL to your custom domain
6. Redeploy

---

## Important Notes

### Database Seeding

- **The database is already seeded** from your local setup
- The `vercel-build` script does **NOT** run `db:seed`
- Only seed once (you did it locally)
- Future content changes happen through `/admin`

### Migration Strategy

- Migrations run automatically on every Vercel build (`vercel-build` script)
- If you add new migrations locally:
  1. Test locally with `bunx drizzle-kit migrate`
  2. Commit the migration files in `drizzle/`
  3. Push to GitHub
  4. Vercel will apply migrations on next deploy

### Build Command

The project uses `vercel-build` script which:
1. Runs `drizzle-kit migrate` (applies pending migrations)
2. Runs `next build --webpack` (webpack, not Turbopack - intentional for sharp module)

---

## Troubleshooting

### Build Fails: Database Connection Error

- Verify `DATABASE_URL` is set in Vercel environment variables
- Ensure it's the **pooled** connection string for serverless
- Check database is accessible from the internet
- Test connection locally with the same URL

### Admin Login Doesn't Work

- Verify `ADMIN_GITHUB_LOGIN` matches your GitHub username exactly
- Check GitHub OAuth callback URL is correct
- Verify `AUTH_SECRET` is set
- Check browser console for errors

### Images Don't Upload

- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check Vercel Blob is created and connected
- Test with a URL instead (URLs always work)

### Build Works Locally But Fails on Vercel

- Check all environment variables are set in Vercel
- Verify bun is being used (check build logs)
- Ensure database is accessible from Vercel's network

### Homepage Shows 500 Error

- Check Vercel function logs for errors
- Verify database migrations were applied
- Check database has seeded data
- Ensure all required environment variables are set

---

## Monitoring

### Vercel Dashboard

- **Deployments**: See build logs and deployment history
- **Functions**: Monitor serverless function logs
- **Analytics**: View performance metrics (if enabled)
- **Speed Insights**: Monitor Core Web Vitals

### Database Monitoring

**Neon:**
- Dashboard shows connection count, storage usage
- Free tier: 0.5 GB storage, shared compute

**Vercel Postgres:**
- Dashboard shows queries, connections
- Free tier: 256 MB storage, 60 compute hours/month

---

## Cost Estimation

### Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- 6000 build minutes/month
- Unlimited deployments
- Free SSL/CDN

**Neon:**
- 0.5 GB storage
- Shared compute (always on)
- Unlimited queries

**Vercel Blob:**
- 500 MB storage
- 1 GB bandwidth/month

### When You'll Need to Upgrade

- Traffic > 100 GB/month → Vercel Pro ($20/month)
- Database > 0.5 GB → Neon Scale ($19/month)
- More image storage → Vercel Blob add-on

Most personal portfolios stay well within free tiers.

---

## Security Checklist

- [ ] `AUTH_SECRET` is randomly generated (32+ characters)
- [ ] `ADMIN_GITHUB_LOGIN` is set to YOUR username
- [ ] GitHub OAuth callback URL matches your domain
- [ ] `REVALIDATE_SECRET` is set (for `/api/revalidate` endpoint)
- [ ] Database connection uses SSL (`?sslmode=require`)
- [ ] No secrets committed to git (check `.gitignore` includes `.env.local`)
- [ ] Environment variables set in Vercel, not hardcoded

---

## Success Checklist

After deployment, verify:

- [ ] Homepage loads at your Vercel URL
- [ ] All sections render (Hero, About, Projects, Skills, etc.)
- [ ] Images load correctly
- [ ] Dark/light theme toggle works
- [ ] `/admin` redirects to login
- [ ] GitHub OAuth login works
- [ ] Admin dashboard loads after login
- [ ] Can edit content in admin panel
- [ ] Content changes appear on homepage
- [ ] Image uploads work (if Blob is configured)
- [ ] No console errors
- [ ] Site is responsive on mobile

---

## Next Steps

1. **Customize content** through `/admin`
2. **Add your projects** and link GitHub repos
3. **Upload images** (avatar, skill icons, project media)
4. **Set up custom domain** (optional)
5. **Configure analytics** (optional)
6. **Share your portfolio!** 🎉

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Project Issues**: https://github.com/lodhiPlayBits/portfolio-nextjs/issues
- **README**: See main README.md for architecture details
