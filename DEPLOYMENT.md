# Kishan Drishti - Deployment Guide

## Vercel Deployment Setup

### Required Environment Variables

Add these environment variables in your Vercel project settings:

```env
# Database (use Vercel Postgres or other hosted database for production)
DATABASE_URL="your-production-database-url"

# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="https://your-app-url.vercel.app"
```

### Steps to Deploy:

1. **Push code to GitHub** (already done ✓)

2. **Import project to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add the variables listed above
   - Generate NEXTAUTH_SECRET: `openssl rand -base64 32`

4. **Database Setup:**
   - For production, use **Vercel Postgres** or **PlanetScale**
   - Update DATABASE_URL in Vercel environment variables
   - Run migrations: `npx prisma migrate deploy`

5. **Deploy:**
   - Vercel will auto-deploy on every push to main branch

### Build Configuration

The project uses:
- **Build Command:** `prisma generate && next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install --legacy-peer-deps`

### Post-Deployment

After first deployment:
1. Set NEXTAUTH_URL to your actual Vercel URL
2. Redeploy to apply changes
3. Test authentication flow

### Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Setup database
npx prisma generate
npx prisma migrate dev

# Run dev server
npm run dev
```

### Important Notes

- `.env` file is in `.gitignore` (not pushed to GitHub)
- Use Vercel Environment Variables for production secrets
- Database migrations must be run manually in production
- SQLite (dev.db) is only for local development

### Authentication Routes

- `/auth?role=admin` - Admin login/signup
- `/auth?role=developer` - Developer login/signup  
- `/admin` - Admin dashboard (protected)
- `/developer` - Developer portal (protected)
- `/` - Public home page

### Troubleshooting

**Issue: Routes showing as static**
- Ensure `export const dynamic = 'force-dynamic'` is in page files
- Clear Vercel build cache and redeploy

**Issue: Authentication not working**
- Verify NEXTAUTH_SECRET is set in Vercel
- Verify NEXTAUTH_URL matches your deployment URL
- Check database connection string

**Issue: Build failing**
- Ensure `prisma generate` runs before build
- Check Node.js version (use 18.x or later)
- Verify all dependencies are installed

## Support

For issues, check:
- Vercel deployment logs
- Next.js error messages
- Prisma migration status
