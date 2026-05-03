#!/bin/bash

# Portfolio Development Startup Script
# This script helps you start all services easily

echo "🚀 Starting Portfolio Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Function to check if directory exists
check_dir() {
    if [ ! -d "$1" ]; then
        echo "❌ Directory $1 not found!"
        exit 1
    fi
}

# Check directories
check_dir "server"
check_dir "client"
check_dir "admin"

# Check if .env exists in server
if [ ! -f "server/.env" ]; then
    echo "${YELLOW}⚠️  Warning: server/.env not found!${NC}"
    echo "Creating a template .env file..."
    cat > server/.env << EOF
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
EOF
    echo "📝 Please edit server/.env and add your MongoDB connection string"
    echo ""
fi

# Install dependencies if needed
echo "${BLUE}📦 Checking dependencies...${NC}"
echo ""

if [ ! -d "server/node_modules" ]; then
    echo "Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "admin/node_modules" ]; then
    echo "Installing admin dependencies..."
    cd admin && npm install && cd ..
fi

echo ""
echo "${GREEN}✅ All dependencies installed!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "${GREEN}🎉 Ready to start!${NC}"
echo ""
echo "Open 3 separate terminals and run:"
echo ""
echo "${BLUE}Terminal 1 (Backend):${NC}"
echo "  cd server && npm start"
echo ""
echo "${BLUE}Terminal 2 (Client):${NC}"
echo "  cd client && npm run dev"
echo ""
echo "${BLUE}Terminal 3 (Admin):${NC}"
echo "  cd admin && npm run dev"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Access URLs:"
echo "  Portfolio: ${GREEN}http://localhost:5173${NC}"
echo "  Admin:     ${GREEN}http://localhost:5174${NC}"
echo "  API:       ${GREEN}http://localhost:5000${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
