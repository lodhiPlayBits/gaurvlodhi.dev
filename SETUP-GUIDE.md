# Local Setup Guide

## Prerequisites

Before starting, ensure you have:

1. **Bun ≥ 1.1** - [Install Bun](https://bun.sh/)
2. **PostgreSQL ≥ 14** - Running locally or use a managed service (Neon, Supabase, etc.)
3. **GitHub Account** - For OAuth authentication

---

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
bun install
```

### Step 2: Set Up PostgreSQL Database

**Option A: Local PostgreSQL**

1. Install PostgreSQL if not already installed
2. Create a new database:
   ```bash
   createdb portfolio
   ```
3. Your connection string will be:
   ```
   postgresql://postgres:password@localhost:5432/portfolio
   ```

**Option B: Managed Service (Recommended for beginners)**

Use [Neon](https://neon.tech/) (free tier available):
1. Sign up at https://neon.tech/
2. Create a new project
3. Copy the connection string (use the **pooled** connection string)

### Step 3: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: Portfolio Local Dev
   - **Homepage URL**: http://localhost:4000
   - **Authorization callback URL**: http://localhost:4000/api/auth/callback/github
4. Click **"Register application"**
5. Note down the **Client ID**
6. Generate a new **Client Secret** and note it down

### Step 4: Create GitHub Personal Access Token (Optional but Recommended)

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name like "Portfolio Dev"
4. Select scopes: `public_repo` (or just `repo` if you want private repos too)
5. Click **"Generate token"**
6. Copy the token immediately (you won't see it again)

### Step 5: Configure Environment Variables

Edit the `.env.local` file that was created:

1. **DATABASE_URL**: Your PostgreSQL connection string
2. **AUTH_SECRET**: Generate with:
   ```bash
   openssl rand -base64 32
   ```
3. **AUTH_GITHUB_ID**: Your GitHub OAuth App Client ID
4. **AUTH_GITHUB_SECRET**: Your GitHub OAuth App Client Secret
5. **ADMIN_GITHUB_LOGIN**: Your GitHub username (e.g., "johndoe")
6. **GITHUB_TOKEN**: Your GitHub Personal Access Token (optional)
7. **NEXT_PUBLIC_SITE_URL**: Keep as http://localhost:4000

Example minimal configuration:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/portfolio"
AUTH_SECRET="abc123xyz789...generated-secret"
AUTH_GITHUB_ID="Iv1.a1b2c3d4e5f6g7h8"
AUTH_GITHUB_SECRET="1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0"
ADMIN_GITHUB_LOGIN="yourusername"
GITHUB_TOKEN="ghp_abc123xyz789..."
NEXT_PUBLIC_SITE_URL="http://localhost:4000"
```

### Step 6: Set Up the Database

Run migrations to create the schema:
```bash
bunx drizzle-kit migrate
```

Seed the database with initial data:
```bash
bun run db:seed
```

This creates sample content for:
- Profile (hero section, about)
- Projects
- Skills
- Experiences
- Services
- Social links
- FAQs
- Taglines

### Step 7: Enable Git Hooks (Optional)

Enable pre-push checks (lint + format):
```bash
git config core.hooksPath .githooks
```

### Step 8: Start the Development Server

```bash
bun run dev
```

The site will be available at: **http://localhost:4000**

---

## Verification

1. **Homepage**: Visit http://localhost:4000 - you should see the seeded content
2. **Admin Login**: Go to http://localhost:4000/admin - click "Sign in with GitHub"
3. **Admin Panel**: After signing in, you should see the admin dashboard with CRUD tabs

---

## Common Issues

### Database Connection Fails

- Verify PostgreSQL is running: `pg_isready` (if local)
- Check the connection string format
- Ensure the database exists
- Check firewall/network settings for managed databases

### Build Error: "sharp" Module Issues

This is expected if you see it during `bun run build`. The project uses webpack for production builds specifically to handle sharp correctly. Dev mode (`bun run dev`) uses Turbopack and works fine.

### Admin Login Fails

- Verify your GitHub username matches `ADMIN_GITHUB_LOGIN` exactly
- Check that the OAuth callback URL is configured correctly
- Clear browser cookies and try again
- Check the console for detailed error messages

### Port Already in Use

If port 4000 is in use, you can change it:
```bash
bun run dev -- -p 3000
```

---

## Next Steps

1. **Customize Content**: Log into `/admin` and edit:
   - Profile (name, bio, avatar)
   - Projects (add your GitHub repos)
   - Skills, experiences, services
   - Social links

2. **Upload Images**: 
   - For local dev, you can use URLs
   - For production, configure Vercel Blob (`BLOB_READ_WRITE_TOKEN`)

3. **Test the Build**:
   ```bash
   bun run build
   bun run start
   ```

4. **Run Quality Checks**:
   ```bash
   bun run lint
   bun run format:check
   bun run typecheck
   bun run test
   ```

---

## Optional: Inspect Database

Open Drizzle Studio to view/edit database contents:
```bash
bun run db:studio
```

This opens a web UI at http://localhost:4983

---

## Production Deployment

See the main README for Vercel deployment instructions.

Key points:
- Use pooled connection strings for serverless Postgres
- Set all required environment variables in Vercel
- Seed production DB once manually before first deploy
- Enable Vercel Blob and Resend for full functionality
