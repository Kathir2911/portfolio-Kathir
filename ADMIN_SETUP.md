# Separate Admin Application - Setup Guide

## What Changed?

Your admin panel is now a **completely separate application** for security. It's no longer accessible from your public portfolio.

## Directory Structure

```
portfolio/
├── client/         # Public portfolio (deploy this)
├── admin/          # Admin panel (keep private!)
└── server/         # Backend API
```

## Running the Applications

### Public Portfolio
```bash
cd /home/kathir/.gemini/antigravity/scratch/portfolio/client
npm run dev
```
Access at: **http://localhost:5173**

### Admin Panel (Private)
```bash
cd /home/kathir/.gemini/antigravity/scratch/portfolio/admin
npm run dev
```
Access at: **http://localhost:5176**

## Security Benefits

✅ **Separate apps** - Admin is completely isolated from public site  
✅ **No public access** - `/admin` route no longer exists  
✅ **Private hosting** - You can run admin locally only  
✅ **Different domains** - Can deploy to different URLs  

## Deployment Strategy

### Option 1: Admin Runs Locally Only (Most Secure)
- Deploy `client/` to a public host (Vercel, Netlify, etc.)
- Deploy `server/` to a backend host (Railway, Render, etc.)
- **Keep `admin/` on your local machine only**
- Access admin from http://localhost:5176
- Make changes locally, they sync to MongoDB and appear on public site

### Option 2: Deploy Admin with Authentication
- Deploy `client/` publicly
- Deploy `server/` publicly
- Deploy `admin/` to a **different private URL**
- Add password protection:
  - Use Vercel/Netlify password protection
  - Add basic auth to the admin app
  - Use VPN or IP whitelisting

### Option 3: Deploy Admin to Private Network
- Use a VPN to access admin panel
- Deploy admin behind firewall
- Use SSH tunneling

## Recommended: Local Admin Only

The safest approach:

1. **Deploy `client/`** → Your public portfolio (vercel.app)
2. **Deploy `server/`** → Your API backend (railway.app)
3. **Keep `admin/`** → Run locally on your computer

When you need to update content:
1. Open admin on your computer: `cd admin && npm run dev`
2. Make changes at http://localhost:5176
3. Changes save to MongoDB Atlas (cloud)
4. Public portfolio automatically shows updates

## Environment Variables

Make sure your `.env` in the server folder is secured:
- Never commit it to git
- Use different credentials for production
- Enable MongoDB Atlas IP whitelist

## Both Apps Use Same Backend

Both the public portfolio and admin panel connect to the same MongoDB database at:
- **Backend API**: http://localhost:5000 (local) or your deployed URL
- **Database**: MongoDB Atlas (cloud)

## Quick Start

1. **Start the backend:**
   ```bash
   cd server
   npm start
   ```

2. **Start the public portfolio:**
   ```bash
   cd client
   npm run dev
   ```

3. **Start the admin (when needed):**
   ```bash
   cd admin
   npm run dev
   ```

All three run simultaneously on different ports!

## Updating Content

1. Open admin panel (http://localhost:5176)
2. Add/edit/delete content
3. Changes save to MongoDB
4. Public portfolio (http://localhost:5173) shows updates instantly

No code changes needed! 🎉
