#!/bin/bash

# Deployment script for aktivelink.fi
# Usage: ./deploy.sh [server-user@server-ip:/path/to/webroot]

set -e

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building application..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Copy .htaccess to dist if it doesn't exist
if [ ! -f "dist/.htaccess" ]; then
    echo "📋 Copying .htaccess to dist..."
    cp .htaccess dist/.htaccess
fi

# If server details provided, deploy via rsync
if [ -n "$1" ]; then
    echo "📤 Deploying to server: $1"
    rsync -avz --delete dist/ "$1"
    echo "✅ Deployment complete!"
else
    echo "📁 Build files are ready in the 'dist' directory"
    echo "💡 To deploy, upload the contents of 'dist/' to your web server"
    echo "💡 Or run: ./deploy.sh user@server:/var/www/aktivelink.fi"
fi

