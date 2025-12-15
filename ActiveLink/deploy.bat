@echo off
REM Deployment script for aktivelink.fi (Windows)
REM Usage: deploy.bat [server-user@server-ip:/path/to/webroot]

echo 🚀 Starting deployment process...

REM Build the application
echo 📦 Building application...
call npm run build

if not exist "dist" (
    echo ❌ Build failed: dist directory not found
    exit /b 1
)

echo ✅ Build completed successfully

REM Copy .htaccess to dist if it doesn't exist
if not exist "dist\.htaccess" (
    echo 📋 Copying .htaccess to dist...
    copy .htaccess dist\.htaccess
)

echo 📁 Build files are ready in the 'dist' directory
echo 💡 Upload the contents of 'dist\' to your web server
echo 💡 Or use an FTP client, rsync, or your hosting provider's file manager

pause

