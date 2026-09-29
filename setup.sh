#!/bin/bash

# Portfolio Setup Script
echo "🚀 Starting portfolio setup..."
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed!"
    echo "Run: curl -fsSL https://bun.sh/install | bash"
    echo "Then restart your terminal and run this script again."
    exit 1
fi

echo "✓ Bun is installed ($(bun --version))"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
bun install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Apply database migrations
echo "🗄️  Applying database migrations..."
bunx drizzle-kit migrate

if [ $? -ne 0 ]; then
    echo "❌ Failed to apply migrations"
    exit 1
fi

echo "✓ Migrations applied"
echo ""

# Seed the database
echo "🌱 Seeding database..."
bun run db:seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✓ Database seeded"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create GitHub OAuth App: https://github.com/settings/developers"
echo "   - Homepage URL: http://localhost:4000"
echo "   - Callback URL: http://localhost:4000/api/auth/callback/github"
echo ""
echo "2. Update .env.local with:"
echo "   - AUTH_GITHUB_ID (from OAuth App)"
echo "   - AUTH_GITHUB_SECRET (from OAuth App)"
echo ""
echo "3. Start the dev server:"
echo "   bun run dev"
echo ""
echo "4. Visit: http://localhost:4000"
echo ""
