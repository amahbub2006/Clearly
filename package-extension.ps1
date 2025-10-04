# Clearly Extension Packaging Script
# This script creates a distributable zip file of the extension

Write-Host "📦 Packaging Clearly Extension..." -ForegroundColor Green

# Get the current directory
$extensionPath = Get-Location
$parentPath = Split-Path $extensionPath -Parent
$zipPath = Join-Path $parentPath "clearly-extension.zip"

# Remove existing zip if it exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath
    Write-Host "🗑️ Removed existing zip file" -ForegroundColor Yellow
}

# Create the zip file
try {
    Compress-Archive -Path ".\*" -DestinationPath $zipPath -Force
    Write-Host "✅ Extension packaged successfully!" -ForegroundColor Green
    Write-Host "📁 Package location: $zipPath" -ForegroundColor Cyan
    
    # Show file size
    $fileSize = (Get-Item $zipPath).Length / 1MB
    Write-Host "📊 Package size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error packaging extension: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "1. Share the zip file with users" -ForegroundColor White
Write-Host "2. Users can extract and load it in Chrome" -ForegroundColor White
Write-Host "3. Or upload to Chrome Web Store for distribution" -ForegroundColor White
