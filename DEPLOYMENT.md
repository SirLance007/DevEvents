# 🚀 Vercel Deployment Guide

## Pre-deployment Checklist ✅

### 1. **Push Code to GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. **Vercel Setup Steps**

1. **Go to [vercel.com](https://vercel.com) and sign up/login**

2. **Import your GitHub repository**
   - Click "New Project"
   - Import your GitHub repo
   - Framework Preset: **Next.js** (auto-detected)

3. **Configure Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:

   ```
   MONGODB_URI=mongodb+srv://prankursharma40_db_user:prankur@devevent.6rg5dgb.mongodb.net/?appName=DevEvent
   
   CLOUDINARY_URL=cloudinary://427893572958964:wvyRlUCh-796sMfKFU-osJzkBzA@dejyntlu6
   
   NEXT_PUBLIC_POSTHOG_KEY=phc_u9SADn3iifS12cYiDcREibqKL2nlQuXcGQ4TMvxU8hA
   
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

   **Important:** Don't set `NEXT_PUBLIC_BASE_URL` - Vercel will handle this automatically!

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app-name.vercel.app`

### 3. **Post-deployment**

1. **Update your local .env**
   ```
   NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
   ```

2. **Test your deployed app**
   - Visit your Vercel URL
   - Test API endpoints: `/api/events` and `/api/events/[slug]`
   - Test event pages: `/events/cloud-next-2027`

## 🔧 Troubleshooting

### Build Errors
- Check Vercel build logs in dashboard
- All TypeScript errors must be fixed
- Ensure all imports are correct

### API Issues
- Verify environment variables are set correctly
- Check MongoDB connection string
- Ensure Cloudinary URL is correct

### Image Loading Issues
- Verify Cloudinary domain in `next.config.ts`
- Check image URLs in your database

## 📝 Important Notes

- **Environment Variables**: Never commit `.env` file to GitHub
- **MongoDB**: Your current connection string is already configured
- **Cloudinary**: Images will load from your existing Cloudinary account
- **PostHog**: Analytics will work with your existing setup
- **Auto-scaling**: Vercel handles this automatically

## 🎉 Success!

Once deployed, your app will be available at:
- **Main URL**: `https://your-app-name.vercel.app`
- **Events API**: `https://your-app-name.vercel.app/api/events`
- **Single Event**: `https://your-app-name.vercel.app/events/cloud-next-2027`