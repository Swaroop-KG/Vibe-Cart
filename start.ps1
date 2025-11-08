# Vibe Cart - Quick Start Script
# This script starts both backend and frontend servers

Write-Host "🚀 Starting Vibe Cart Application..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies (if needed)..." -ForegroundColor Cyan
Write-Host ""

# Install backend dependencies
Write-Host "Backend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\backend"
if (-not (Test-Path "node_modules")) {
    npm install
}

# Install frontend dependencies
Write-Host "Frontend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\frontend"
if (-not (Test-Path "node_modules")) {
    npm install
}

Write-Host ""
Write-Host "🎯 Starting servers..." -ForegroundColor Green
Write-Host ""

# Start backend in new window
Write-Host "Starting Backend on http://localhost:5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '🔧 Backend Server' -ForegroundColor Green; npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting Frontend on http://localhost:5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '⚛️ Frontend Server' -ForegroundColor Blue; npm run dev"

# Wait a bit for frontend to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Application URLs:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Opening application in browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "ℹ️  Two terminal windows have opened:" -ForegroundColor Yellow
Write-Host "   1. Backend terminal (port 5000)" -ForegroundColor Gray
Write-Host "   2. Frontend terminal (port 5173)" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  Keep both terminals running while using the app!" -ForegroundColor Yellow
Write-Host "   Close the terminals to stop the servers." -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
