# Quick Start Guide

## 🚀 Fastest Way to Run Locally

### For Linux/Mac:
```bash
./start-dev.sh
```

### For Windows:
```cmd
start-dev.bat
```

This will install all dependencies and show you what to do next.

---

## ⚡ Manual Quick Start

### 1️⃣ Start Backend (Terminal 1)
```bash
cd server
npm install
npm start
```
✅ Server running at: http://localhost:5000

### 2️⃣ Start Client (Terminal 2)
```bash
cd client
npm install
npm run dev
```
✅ Portfolio at: http://localhost:5173

### 3️⃣ Start Admin (Terminal 3)
```bash
cd admin
npm install
npm run dev
```
✅ Admin panel at: http://localhost:5174

---

## 📝 Important: MongoDB Setup

Before starting, you need MongoDB:

### Option 1: MongoDB Atlas (Recommended - Free)
1. Go to https://mongodb.com/cloud/atlas
2. Sign up and create a free cluster
3. Get your connection string
4. Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio
NODE_ENV=development
```

### Option 2: Local MongoDB
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

---

## 🎯 What to Do After Starting

1. **Check API Health**: http://localhost:5000/api/health
2. **Open Admin Panel**: http://localhost:5174
3. **Add Your Content**: Use the admin panel to add projects, skills, etc.
4. **View Portfolio**: http://localhost:5173

---

## 🐛 Common Issues

### "Port already in use"
Kill the process using the port:
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Cannot connect to MongoDB"
- Check your `.env` file
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Test connection string

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Full Documentation

See `LOCAL_SETUP_GUIDE.md` for detailed instructions.

---

## ✨ New Professional UI

The portfolio now has a modern, professional design:
- Clean color scheme (Indigo, Cyan, Emerald)
- Professional card layouts
- Smooth animations
- Mobile responsive
- Corporate-friendly appearance

See `UI_REDESIGN_SUMMARY.md` for details.

---

## 🎨 Customization

After running locally, you can:
- Edit colors in `client/src/styles/global.css`
- Modify components in `client/src/components/`
- Update content via admin panel
- Change API endpoints in `.env` files

---

## 📦 Project Structure

```
portfolio/
├── server/          # Backend API (Express + MongoDB)
├── client/          # Portfolio Website (React + Vite)
├── admin/           # Admin Panel (React + Vite)
├── start-dev.sh     # Linux/Mac startup script
├── start-dev.bat    # Windows startup script
└── *.md             # Documentation files
```

---

## 🚢 Ready for Production?

Build for production:
```bash
cd client && npm run build
cd admin && npm run build
```

Deploy to Vercel, Netlify, or your preferred hosting.

---

Need help? Check the detailed guides:
- `LOCAL_SETUP_GUIDE.md` - Complete setup instructions
- `UI_REDESIGN_SUMMARY.md` - Design changes documentation
- `README.md` - Project overview
