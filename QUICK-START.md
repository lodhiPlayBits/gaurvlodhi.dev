# Quick Start Instructions

## ⚠️ Prerequisites Check

Run these commands to verify what you have:

```bash
# Check if Bun is installed
bun --version

# Check if PostgreSQL is installed
psql --version

# Check if Git is installed
git --version
```

---

## 🚀 Installation Steps

### 1. Install Bun (Required)

**Windows (PowerShell as Administrator):**
```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

**Or download installer:**
- Visit: https://bun.sh/
- Download the Windows installer
- Run and follow the prompts

After installation, **restart your terminal** and verify:
```bash
bun --version
```

### 2. Install/Configure PostgreSQL

**Option A: Install PostgreSQL Locally**

Windows:
1. Download from https://www.postgresql.org/download/windows/
2. Run the installer (use default port 5432)
3. Remember the password you set for the `postgres` user
4. After installation, create a database:
   ```bash
   createdb -U postgres portfolio
   ```

**Option B: Use Neon (Cloud PostgreSQL - Recommended)**

1. Go to https://neon.tech/
2. Sign up for free
3. Create a new project
4. Copy the **pooled** connection string
5. Skip the local PostgreSQL installation

---

## 📋 Setup Checklist

Once you have Bun installed, follow these steps:

### ☐ Step 1: Install Dependencies
```bash
cd e:\portfolio-nextjs-master
bun install
```

### ☐ Step 2: Configure Environment Variables

Edit `.env.local` (already created for you) with:

1. **DATABASE_URL** - Your PostgreSQL connection string
   - Local: `postgresql://postgres:your-password@localhost:5432/portfolio`
   - Neon: Copy from Neon dashboard

2. **AUTH_SECRET** - Generate with:
   ```bash
   openssl rand -base64 32
   ```
   Or use an online generator: https://generate-secret.vercel.app/32

3. **GitHub OAuth App** - Create at https://github.com/settings/developers
   - New OAuth App
   - Homepage: `http://localhost:4000`
   - Callback: `http://localhost:4000/api/auth/callback/github`
   - Copy Client ID → `AUTH_GITHUB_ID`
   - Generate Client Secret → `AUTH_GITHUB_SECRET`

4. **ADMIN_GITHUB_LOGIN** - Your GitHub username

5. **NEXT_PUBLIC_SITE_URL** - Keep as `http://localhost:4000`

### ☐ Step 3: Set Up Database
```bash
# Apply migrations
bunx drizzle-kit migrate

# Seed with sample data
bun run db:seed
```

### ☐ Step 4: Start Development Server
```bash
bun run dev
```

Visit: **http://localhost:4000**

### ☐ Step 5: Access Admin Panel

1. Go to http://localhost:4000/admin
2. Click "Sign in with GitHub"
3. Authorize the app
4. You should see the admin dashboard

---

## ✅ Verification

If everything is set up correctly:

- ✅ Homepage loads with seeded content (profile, projects, skills)
- ✅ You can log into `/admin` with your GitHub account
- ✅ Admin panel shows CRUD tabs for all content types
- ✅ No console errors in browser dev tools

---

## 🆘 Troubleshooting

### Bun command not found
- Restart your terminal after installing Bun
- On Windows, you may need to restart your computer
- Check PATH environment variable includes Bun

### Database connection error
- Verify PostgreSQL is running (local) or connection string is correct (Neon)
- Test connection: `psql <your-database-url>`
- Ensure database exists: `createdb portfolio` (local)

### Can't access admin panel
- Verify `ADMIN_GITHUB_LOGIN` matches your GitHub username exactly (case-sensitive)
- Check OAuth callback URL in GitHub app settings
- Clear browser cookies and try again

### Port 4000 already in use
Change port in package.json or run:
```bash
bun run dev -- -p 3000
```

### Build fails with sharp errors
This is expected during `bun run build` - the project intentionally uses webpack for production. Dev mode works fine with Turbopack.

---

## 📚 Next Steps

1. **Customize your portfolio**: Edit content in `/admin`
2. **Add your projects**: Link your GitHub repositories
3. **Upload images**: Use URLs for local dev, or set up Vercel Blob
4. **Run tests**: `bun run test`
5. **Check code quality**: `bun run lint && bun run typecheck`

---

## 📖 Full Documentation

- **SETUP-GUIDE.md** - Detailed setup instructions
- **AGENTS.md** - Project conventions and architecture notes
- **README.md** - Full project documentation
- **CONTRIBUTING.md** - Contributing guidelines
