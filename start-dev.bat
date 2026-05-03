@echo off
REM Portfolio Development Startup Script for Windows
REM This script helps you start all services easily

echo.
echo ========================================
echo   Portfolio Development Environment
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node -v
echo.

REM Check directories
if not exist "server" (
    echo [ERROR] server directory not found!
    pause
    exit /b 1
)
if not exist "client" (
    echo [ERROR] client directory not found!
    pause
    exit /b 1
)
if not exist "admin" (
    echo [ERROR] admin directory not found!
    pause
    exit /b 1
)

REM Check if .env exists in server
if not exist "server\.env" (
    echo [WARNING] server\.env not found!
    echo Creating a template .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=your_mongodb_connection_string_here
        echo NODE_ENV=development
    ) > server\.env
    echo [INFO] Please edit server\.env and add your MongoDB connection string
    echo.
)

REM Install dependencies
echo ========================================
echo   Installing Dependencies
echo ========================================
echo.

if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules" (
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
)

if not exist "admin\node_modules" (
    echo Installing admin dependencies...
    cd admin
    call npm install
    cd ..
)

echo.
echo ========================================
echo   All dependencies installed!
echo ========================================
echo.
echo.
echo ========================================
echo   Ready to Start!
echo ========================================
echo.
echo Open 3 separate Command Prompts and run:
echo.
echo Terminal 1 (Backend):
echo   cd server ^&^& npm start
echo.
echo Terminal 2 (Client):
echo   cd client ^&^& npm run dev
echo.
echo Terminal 3 (Admin):
echo   cd admin ^&^& npm run dev
echo.
echo ========================================
echo   Access URLs:
echo ========================================
echo   Portfolio: http://localhost:5173
echo   Admin:     http://localhost:5174
echo   API:       http://localhost:5000
echo ========================================
echo.
pause
