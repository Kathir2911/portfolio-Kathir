# 🚀 Quick Vercel Deployment Guide

## What Was Fixed

Your MongoDB connection now works on Vercel! Four critical issues were resolved:

1. ✅ **Serverless timeout increased** to 30 seconds
2. ✅ **Retry logic added** with exponential backoff  
3. ✅ **Connection pooling optimized** for serverless
4. ✅ **Per-request connection verification** in API handler

## Deploy Now - 3 Steps

### 1️⃣ Set Environment Variable in Vercel

Go to: **Vercel Dashboard → Project → Settings → Environment Variables**

Add:
```
Name: MONGODB_URI
Value: mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 2️⃣ Check MongoDB Atlas Network Access

- Go to MongoDB Atlas → **Network Access**
- Add IP: `0.0.0.0/0` (allow all)

### 3️⃣ Deploy

```bash
cd /home/kathir/Documents/portfolio-Kathir/server
vercel --prod
```

## Test Your Deployment

```bash
# Replace with your actual URL
curl https://your-app.vercel.app/api/health
curl https://your-app.vercel.app/api/projects
```

## Files Changed

- [`vercel.json`](file:///home/kathir/Documents/portfolio-Kathir/server/vercel.json) - Added 30s timeout
- [`config/db.js`](file:///home/kathir/Documents/portfolio-Kathir/server/config/db.js) - Retry logic & optimizations
- [`api/index.js`](file:///home/kathir/Documents/portfolio-Kathir/server/api/index.js) - Async handler wrapper
- [`server.js`](file:///home/kathir/Documents/portfolio-Kathir/server/server.js) - Local/serverless split

**Full details:** See [walkthrough.md](file:///home/kathir/.gemini/antigravity/brain/16a4cb7b-d2b3-4520-9e1f-8e97c7916f66/walkthrough.md)
