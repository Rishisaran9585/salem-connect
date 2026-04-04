# Domain Migration Guide - Salem Connect

**Old Domain:** localhost:8081/salem-connect  
**New Domain:** maroon-finch-443423.hostingersite.com

---

## Files to Update

### 1. `vite.config.ts` - Frontend Proxy Configuration

**Location:** Root of project

**Change:**
```typescript
proxy: {
  '/backend': {
    target: 'http://maroon-finch-443423.hostingersite.com',
    changeOrigin: true,
    rewrite: (path: string) => '/backend' + path,  // Remove '/salem-connect'
    secure: true,  // Use HTTPS for production
  }
}
```

**What it does:** Routes all `/backend` API calls from the frontend to your new domain

---

### 2. `backend/config/config.php` - Backend Base URL

**Location:** backend/config/

**Change:**
```php
define('BASE_URL', 'https://maroon-finch-443423.hostingersite.com/backend/api/v1/');
```

**What it does:** Sets the base URL that the backend uses for self-references

---

### 3. CORS Headers (Already Configured ✅)

**Location:** backend/includes/response.php

**Status:** ALREADY CORRECT - Uses `"*"` which accepts all origins

```php
header("Access-Control-Allow-Origin: *");
```

This means your backend will accept requests from any domain/origin, so no changes needed!

---

## Deployment Steps

### Step 1: Setup on Hostinger

1. **Upload files to your Hostinger account:**
   - Upload entire project to your hosting root or subdirectory
   - Ensure PHP version matches requirements (PHP 7.4+)
   - Create database `salem_directory` and import `sql/schema.sql`

2. **Create `.env` file (optional, for better security):**
   ```
   DB_HOST=your_hostinger_db_host
   DB_USER=your_db_username
   DB_PASS=your_db_password
   DB_NAME=salem_directory
   ```

3. **Update `backend/config/config.php`:**
   - Point to Hostinger database credentials
   - Update `BASE_URL` to the new domain

### Step 2: Update Code Files

#### Option A: Build & Deploy

If you have a build process:

```bash
# Terminal in project root
npm run build  # or 'bun run build'

# This creates a dist/ folder
# Upload contents to Hostinger
```

#### Option B: Edit Directly on Files

Use an editor to update:

**File 1: `vite.config.ts`**
```typescript
proxy: {
  '/backend': {
    target: 'https://maroon-finch-443423.hostingersite.com',
    changeOrigin: true,
    rewrite: (path: string) => '/backend' + path,
    secure: true,
  }
}
```

**File 2: `backend/config/config.php`**
```php
define('BASE_URL', 'https://maroon-finch-443423.hostingersite.com/backend/api/v1/');
```

### Step 3: Create `.htaccess` Files on Hostinger

These ensure proper routing and security:

**Root `.htaccess`:**
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

**`backend/.htaccess`:**
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

<IfModule mod_headers.c>
    SetEnvIf Authorization ^(.*)$ HTTP_AUTHORIZATION=$1
</IfModule>
```

**`backend/uploads/.htaccess`:**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine Off
</IfModule>

<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>
```

### Step 4: Verify Deployment

1. **Visit:** `https://maroon-finch-443423.hostingersite.com`
2. **Check API endpoints:** Add `/backend/api/v1/admin/check-db.php` to URL
3. **Test login:** Try logging into `/admin`
4. **Check browser console:** Look for any API errors (F12 → Console)

---

## Important Notes

### Database Setup
- Create MySQL database `salem_directory`
- Import `sql/schema.sql`
- Ensure admin user exists (default: admin@salemdir.com / admin123)

### File Permissions
Set proper permissions on Hostinger:
- `/backend/uploads/` → 755 (read/write/execute for all)
- `/backend/uploads/hero/` → 755
- `/backend/uploads/categories/` → 755
- `/backend/config/config.php` → 644

### HTTPS/SSL
- Hostinger typically provides free SSL
- Use `https://` in all URLs (secure)
- Update vite.config.ts `secure: true` for HTTPS

### Environmental Variables (Advanced)
For better security, use environment variables:

```php
// backend/config/config.php
define('DB_HOST', getenv('DB_HOST') ?: 'hostinger_host');
define('DB_USER', getenv('DB_USER') ?: 'db_user');
define('DB_PASS', getenv('DB_PASS') ?: 'db_password');
define('DB_NAME', getenv('DB_NAME') ?: 'salem_directory');
```

---

## Troubleshooting

### Issue: "Cannot connect to backend" or 404 errors

**Cause:** Proxy path mismatch

**Solution:**
1. Check vite.config.ts `target` matches your domain
2. Verify `/backend` folder exists in Hostinger
3. Check .htaccess files are uploaded correctly

### Issue: API returns 401 (Unauthorized)

**Cause:** Auth header not being passed

**Solution:**
1. Ensure `backend/.htaccess` includes Authorization header setup
2. Check Hostinger Apache modules (mod_rewrite, mod_headers enabled)
3. Verify JWT_SECRET in config.php matches

### Issue: File uploads not working

**Cause:** Upload directory permissions

**Solution:**
1. SSH into Hostinger
2. Run: `chmod 755 backend/uploads`
3. Run: `chmod 755 backend/uploads/hero`
4. Run: `chmod 755 backend/uploads/categories`

### Issue: Database connection fails

**Cause:** Wrong credentials in config.php

**Solution:**
1. Get correct database host/user/password from Hostinger panel
2. Update `backend/config/config.php`
3. Test connection

---

## Quick Reference: Files to Change

| File | Change | From | To |
|------|--------|------|-----|
| vite.config.ts | proxy.target | `http://localhost` | `https://maroon-finch-443423.hostingersite.com` |
| vite.config.ts | rewrite rule | `/salem-connect` + path | `/backend` + path |
| vite.config.ts | secure | `false` | `true` |
| backend/config/config.php | BASE_URL | `http://localhost/salem-connect/...` | `https://maroon-finch-443423.hostingersite.com/backend/api/v1/` |
| backend/config/config.php | DB_HOST | `localhost` | Hostinger DB host |
| backend/config/config.php | DB_USER | `root` | Hostinger DB user |
| backend/config/config.php | DB_PASS | `` (empty) | Hostinger DB password |

---

## Final Verification Checklist

- [ ] Database created and schema imported
- [ ] Admin user exists in admins table
- [ ] vite.config.ts updated with new domain
- [ ] backend/config/config.php updated with new domain and DB credentials
- [ ] .htaccess files uploaded to: root, /backend, /backend/uploads
- [ ] Upload directories have correct permissions (755)
- [ ] SSL/HTTPS enabled on domain
- [ ] Homepage loads: maroon-finch-443423.hostingersite.com
- [ ] Admin login works: maroon-finch-443423.hostingersite.com/admin
- [ ] Dashboard loads without 401 errors
- [ ] API endpoints responding (check Network tab in DevTools)
- [ ] File uploads working in admin categories

---

## Post-Migration Cleanup

Delete debug files from backend (if still present):
- `backend/api/v1/admin/debug-auth.php`
- `backend/api/v1/admin/check-db.php`
- `backend/api/v1/admin/test-category.php`
- `backend/test-headers.php`

---

**Need help?** Make sure to:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check browser console for errors (F12)
3. Verify API responses in Network tab
4. Check Hostinger error logs for PHP errors
