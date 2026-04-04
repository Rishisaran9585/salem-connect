# Quick Start: Hostinger Deployment

**Domain:** maroon-finch-443423.hostingersite.com

---

## Step 1: Files Already Updated ✅

The following files have been automatically updated:

```
✅ vite.config.ts
   - Proxy target: https://maroon-finch-443423.hostingersite.com
   - Rewrite removed /salem-connect
   - Secure: true

✅ backend/config/config.php  
   - BASE_URL: https://maroon-finch-443423.hostingersite.com/backend/api/v1/
```

---

## Step 2: Prepare for Hostinger

### Create Project Build (if not already built)

```bash
# In project root terminal
npm run build
# or
bun run build

# This creates a 'dist/' folder
```

### Gather Database Credentials

From Hostinger control panel, get:
- Database host (something like: mysql123.hostingersite.com)
- Database username
- Database password
- Or ask Hostinger support for these

---

## Step 3: Upload to Hostinger

### Via File Manager (Easiest)

1. Log in to Hostinger control panel
2. Go to File Manager
3. Upload to `/public_html/` or specified web root:
   - If you ran `npm run build`:
     - Upload files from `dist/` folder
     - Upload entire `backend/` folder
     - Upload `sql/` folder
   
   - If not building:
     - Upload entire project except `node_modules/`
     - Keep `src/` folder on local machine only

### Via FTP

1. Use FileZilla or similar FTP client
2. Connect to Hostinger FTP credentials
3. Upload same files as above
4. Set file permissions: Right-click → File permissions → 644 (files), 755 (folders)

### Via Git (Advanced)

```bash
# If Hostinger supports Git deployment
git push production-remote main
```

---

## Step 4: Create Database

1. Log in to Hostinger → Databases → phpMyAdmin
2. Create new database: `salem_directory`
3. Import SQL:
   - `SQL` tab → Choose file → Select `sql/schema.sql` → Import
4. Verify tables created:
   - `admins`, `businesses`, `categories`, `hero_slides`, `contacts`, etc.

---

## Step 5: Update Database Credentials

### Via File Manager

1. In File Manager, navigate to `/backend/config/`
2. Edit `config.php`:
   ```php
   define('DB_HOST', 'YOUR_HOSTINGER_DB_HOST');
   define('DB_USER', 'YOUR_DB_USERNAME');
   define('DB_PASS', 'YOUR_DB_PASSWORD');
   define('DB_NAME', 'salem_directory');
   ```

3. Save file

### Verify Credentials

Create temporary test file `/backend/test-connection.php`:
```php
<?php
require_once 'config/config.php';
require_once 'includes/db.php';
echo "Database connection successful!";
?>
```

- Access via browser: `https://maroon-finch-443423.hostingersite.com/backend/test-connection.php`
- If error shows → Fix credentials and retry
- Delete test file after confirming connection

---

## Step 6: Verify Directory Structure

Hostinger should have this structure:

```
/public_html/
├── index.html
├── .htaccess (root)
├── backend/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── admin/
│   │   │   ├── hero.php
│   │   │   ├── categories.php
│   │   │   └── ...
│   │   └── ...
│   ├── config/
│   │   └── config.php (UPDATED with credentials)
│   ├── includes/
│   ├── uploads/
│   │   ├── hero/
│   │   └── categories/
│   └── .htaccess
└── ... (other files)
```

---

## Step 7: Create .htaccess Files

### Root `.htaccess`

Create file at `/public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . index.html [L]
</IfModule>
```

### Backend `.htaccess`

Create file at `/public_html/backend/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . index.php [L]
</IfModule>

<IfModule mod_headers.c>
    SetEnvIf Authorization ^(.*)$ HTTP_AUTHORIZATION=$1
</IfModule>
```

### Uploads `.htaccess`

Create file at `/public_html/backend/uploads/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine Off
</IfModule>

<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>
```

---

## Step 8: Set Permissions

Use SSH (Terminal) or File Manager to set permissions:

```bash
# Via SSH
chmod 755 backend/uploads
chmod 755 backend/uploads/hero
chmod 755 backend/uploads/categories
chmod 644 backend/config/config.php

# If File Manager: Right-click → Permissions
# - Directories: 755
# - Files: 644
```

---

## Step 9: Test Deployment

### Test Homepage
Visit: `https://maroon-finch-443423.hostingersite.com`

Should see:
- ✅ Homepage loads
- ✅ Navigation visible
- ✅ Images loading (not broken icons)
- ✅ No obvious errors

### Test Admin Login
Visit: `https://maroon-finch-443423.hostingersite.com/admin`

- Username: `admin@salem.local`
- Password: `admin123`

Should see:
- ✅ Admin dashboard loads
- ✅ Statistics display (no 401 errors)
- ✅ Menu items clickable

### Test API Directly
Visit: `https://maroon-finch-443423.hostingersite.com/backend/api/v1/hero.php`

Should see: JSON response with hero slides

### Check Browser Console
Press F12 → Console tab

Should see:
- ✅ No red error messages
- ✅ No 404s for API calls
- ✅ No 401 Authorization errors

---

## Step 10: Troubleshooting

### "Cannot find index.html"
- [ ] Verify .htaccess at root
- [ ] Check RewriteEngine is On
- [ ] Verify files uploaded to correct location

### "Cannot connect to database"
- [ ] Verify credentials in `backend/config/config.php`
- [ ] Test with phpMyAdmin
- [ ] Check database exists

### "401 Unauthorized" on admin
- [ ] Verify `backend/.htaccess` has Authorization header setup
- [ ] Check token is in localStorage (DevTools → Application)
- [ ] Try logging out and back in

### API calls return 404
- [ ] Verify `/backend` folder exists
- [ ] Check file names are correct (php files case-sensitive on Linux)
- [ ] Test with curl: `curl https://domain.com/backend/api/v1/hero.php`

### File upload not working
- [ ] Check directory permissions (755)
- [ ] Verify upload dir exists
- [ ] Check file size limit

---

## Step 11: Security (Important!)

After successful deployment:

1. **Delete debug files:**
   ```
   backend/api/v1/admin/debug-auth.php
   backend/api/v1/admin/check-db.php
   backend/test-connection.php
   ```

2. **Change default password:**
   - Log in as admin
   - Go to Settings
   - Change password (in database later)

3. **Strong JWT Secret:**
   - In `backend/config/config.php`
   - Change `JWT_SECRET` to something strong:
   ```php
   define('JWT_SECRET', 'generate_random_string_here_min_32_chars');
   ```

4. **Enable HTTPS:**
   - Hostinger provides free SSL
   - Force HTTPS in .htaccess:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Reference: Code Changes Made

| File | Change |
|------|--------|
| `vite.config.ts` | Proxy target updated to new domain |
| `backend/config/config.php` | BASE_URL updated to new domain |

That's it! Your app is ready to deploy.

---

## Need Help?

1. **Check Hostinger error logs:**
   - File Manager → Logs folder → error.log
   - Look for PHP errors

2. **Test with curl:**
   ```bash
   curl https://maroon-finch-443423.hostingersite.com/backend/api/v1/categories.php
   ```

3. **Check DevTools:**
   - F12 → Network tab → Check API responses
   - F12 → Console → Check for errors

4. **Contact Hostinger support:**
   - Request to enable: mod_rewrite, mod_headers
   - Request database credentials
   - Request SSH access if needed

---

**Status:** Ready to deploy! 🚀
