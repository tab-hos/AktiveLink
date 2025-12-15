# Deployment Guide for aktivelink.fi

This guide covers deploying your React + Vite application to aktivelink.fi without using Vercel.

## Prerequisites

1. **Domain**: You have aktivelink.fi registered
2. **Hosting**: You need a web hosting service or server
3. **Build**: The application needs to be built for production

## Step 1: Build the Production Version

First, build your application for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Step 2: Choose Your Hosting Option

### Option A: Traditional Web Hosting (cPanel, Shared Hosting)

If you have traditional web hosting (like cPanel):

1. **Upload files**: Upload all contents of the `dist/` folder to your web root (usually `public_html/` or `www/`)

2. **Configure .htaccess** (for Apache servers): Create a `.htaccess` file in your web root with:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures React Router works correctly for all routes.

3. **Point domain**: In your domain registrar, point aktivelink.fi to your hosting provider's nameservers or IP address.

### Option B: VPS/Cloud Server (DigitalOcean, AWS, Linode, etc.)

If you have a VPS or cloud server:

#### Using Nginx

1. **Install Nginx** (if not already installed):
```bash
sudo apt update
sudo apt install nginx
```

2. **Create Nginx configuration** at `/etc/nginx/sites-available/aktivelink.fi`:

```nginx
server {
    listen 80;
    server_name aktivelink.fi www.aktivelink.fi;

    root /var/www/aktivelink.fi;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Handle React Router (SPA routing)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

3. **Create directory and upload files**:
```bash
sudo mkdir -p /var/www/aktivelink.fi
sudo chown -R $USER:$USER /var/www/aktivelink.fi
# Upload your dist/ contents to /var/www/aktivelink.fi
```

4. **Enable the site**:
```bash
sudo ln -s /etc/nginx/sites-available/aktivelink.fi /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

5. **Set up SSL with Let's Encrypt** (recommended):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d aktivelink.fi -d www.aktivelink.fi
```

#### Using Apache

1. **Install Apache** (if not already installed):
```bash
sudo apt update
sudo apt install apache2
```

2. **Enable required modules**:
```bash
sudo a2enmod rewrite
sudo a2enmod ssl
```

3. **Create Apache configuration** at `/etc/apache2/sites-available/aktivelink.fi.conf`:

```apache
<VirtualHost *:80>
    ServerName aktivelink.fi
    ServerAlias www.aktivelink.fi
    
    DocumentRoot /var/www/aktivelink.fi
    
    <Directory /var/www/aktivelink.fi>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # React Router support
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Gzip compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>
    
    # Cache static assets
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
    </IfModule>
</VirtualHost>
```

4. **Create directory and upload files**:
```bash
sudo mkdir -p /var/www/aktivelink.fi
sudo chown -R $USER:www-data /var/www/aktivelink.fi
# Upload your dist/ contents to /var/www/aktivelink.fi
```

5. **Enable the site**:
```bash
sudo a2ensite aktivelink.fi.conf
sudo systemctl reload apache2
```

6. **Set up SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d aktivelink.fi -d www.aktivelink.fi
```

### Option C: GitHub Pages (Free)

1. **Install gh-pages package**:
```bash
npm install --save-dev gh-pages
```

2. **Add scripts to package.json**:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Update vite.config.js** to set the base path:
```js
export default defineConfig({
  base: '/',
  // ... rest of config
});
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Configure GitHub Pages**: In your GitHub repo settings, enable GitHub Pages and set the source to `gh-pages` branch.

6. **Point domain**: Add a `CNAME` file in your `public/` folder with content `aktivelink.fi`, then configure DNS:
   - Add a `CNAME` record: `@` → `yourusername.github.io`
   - Or add `A` records pointing to GitHub Pages IPs

### Option D: Netlify (Alternative to Vercel)

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build and deploy**:
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. **Configure domain**: In Netlify dashboard, add your custom domain aktivelink.fi

## Step 3: Configure DNS

Point your domain to your hosting:

1. **For traditional hosting/VPS**: 
   - Add an `A` record: `@` → your server IP address
   - Add a `CNAME` record: `www` → `aktivelink.fi`

2. **For GitHub Pages**:
   - Add `CNAME` record: `@` → `yourusername.github.io`
   - Or add `A` records to GitHub Pages IPs

3. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)

## Step 4: Verify Deployment

1. Visit `http://aktivelink.fi` (or `https://` if SSL is configured)
2. Test all routes (/, /about, /events, /training, /join)
3. Check that React Router navigation works correctly

## Automated Deployment Script

You can create a deployment script to automate the process. Create `deploy.sh`:

```bash
#!/bin/bash
echo "Building application..."
npm run build

echo "Deploying to server..."
# For VPS/Server (adjust paths and server details)
rsync -avz --delete dist/ user@your-server:/var/www/aktivelink.fi/

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Troubleshooting

### Routes return 404
- Ensure your web server is configured to serve `index.html` for all routes (see .htaccess or nginx config above)

### Assets not loading
- Check that all files from `dist/` are uploaded
- Verify file permissions on the server
- Check browser console for 404 errors

### SSL/HTTPS issues
- Use Let's Encrypt (free SSL certificates)
- Ensure your server allows HTTPS traffic (port 443)

### Domain not resolving
- Wait for DNS propagation (can take up to 48 hours)
- Use `dig aktivelink.fi` or `nslookup aktivelink.fi` to check DNS

## Recommended Setup

For a production site, I recommend:
- **VPS/Cloud Server** (DigitalOcean, Linode, or similar) - $5-10/month
- **Nginx** as web server
- **Let's Encrypt SSL** (free HTTPS)
- **Automated deployment** via script or CI/CD

This gives you full control and is cost-effective.

