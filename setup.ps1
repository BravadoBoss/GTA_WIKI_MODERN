# GTA WIKI Modern - Setup Script
# This script ensures Node.js is in PATH and runs npm install

Write-Host "Setting up GTA WIKI Modern..." -ForegroundColor Green

# Check if Node.js is in PATH
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodePath) {
    Write-Host "Node.js not found in PATH. Adding Node.js to current session..." -ForegroundColor Yellow
    
    # Common Node.js installation paths
    $nodePaths = @(
        "C:\Program Files\nodejs",
        "${env:ProgramFiles}\nodejs",
        "${env:LOCALAPPDATA}\Programs\nodejs",
        "${env:APPDATA}\npm"
    )
    
    $found = $false
    foreach ($path in $nodePaths) {
        if (Test-Path "$path\node.exe") {
            $env:Path += ";$path"
            Write-Host "Found Node.js at: $path" -ForegroundColor Green
            $found = $true
            break
        }
    }
    
    if (-not $found) {
        Write-Host "ERROR: Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
}

# Verify Node.js and npm
Write-Host "`nChecking Node.js installation..." -ForegroundColor Cyan
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "npm: $npmVersion" -ForegroundColor Green

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Setup complete! You can now run 'npm run dev'" -ForegroundColor Green
} else {
    Write-Host "`n❌ Installation failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

