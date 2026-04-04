# Hostinger Deployment Checklist

**Domain:** maroon-finch-443423.hostingersite.com

---

## Pre-Deployment (Local)

- [ ] Code updated in files:
  - [ ] ✅ `vite.config.ts` - Proxy target updated
  - [ ] ✅ `backend/config/config.php` - BASE_URL and DB credentials updated
  - [ ] All changes committed to version control

---

## Database Setup (On Hostinger)

- [ ] phpMyAdmin or database manager accessed
- [ ] New database created: `salem_directory`
- [ ] `sql/schema.sql` imported successfully
- [ ] Admin user created:
  ```sql
  INSERT INTO admins (username, email, password) 
  VALUES ('admin', 'admin@salem.local', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
  ```
  (Password: admin123)

- [ ] Test database connection from localhost

---

## File Upload (To Hostinger)

- [ ] All project files uploaded to Hostinger root:
  - [ ] Frontend files (dist/ if built, or src/ if not built)
  - [ ] Backend folder (/backend)
  - [ ] SQL folder (/sql)
  - [ ] Public folder (/public)
  - [ ] .htaccess files

- [ ] File structure on Hostinger:
  ```
  /public_html/
  ├── index.html (or frontend files)
  ├── backend/
  ├── sql/
  ├── .htaccess (root)
  └── ... (other project files)
  ```

---

## Configuration Updates (On Hostinger)

### Database Credentials
- [ ] SSH/File Manager access to server
- [ ] Update `backend/config/config.php` with Hostinger MySQL credentials:
  ```php
  define('DB_HOST', 'your_hostinger_db_host');
  define('DB_USER', 'your_db_username');
  define('DB_PASS', 'your_db_password');
  define('DB_NAME', 'salem_directory');
  ```

- [ ] Verify credentials by testing database connection

### Directory Permissions
- [ ] Set directory permissions via SSH or File Manager:
  ```bash
  chmod 755 backend/uploads
  chmod 755 backend/uploads/hero
  chmod 755 backend/uploads/categories
  chmod 644 backend/config/config.php
  ```

### .htaccess Files
- [ ] Verify root `.htaccess` exists (or create):
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . index.html [L]
  </IfModule>
  ```

- [ ] Verify `backend/.htaccess` exists (for Authorization header):
  ```apache
  <IfModule mod_headers.c>
    SetEnvIf Authorization ^(.*)$ HTTP_AUTHORIZATION=$1
  </IfModule>
  ```

- [ ] Verify `backend/uploads/.htaccess` exists (for direct file access)

---

## PHP Configuration (On Hostinger)

- [ ] PHP version check: 7.4 or higher
  - [ ] Create file `backend/check-php.php`:
    ```php
    <?php echo phpversion(); ?>
    ```
  - [ ] Access via browser to verify version

- [ ] Required PHP modules installed:
  - [ ] PDO (MySQL driver)
  - [ ] JSON
  - [ ] curl
  - [ ] file_get_contents() enabled

---

## SSL/HTTPS Setup

- [ ] SSL certificate installed (Hostinger usually provides free SSL)
- [ ] Force HTTPS enabled:
  - [ ] Add to `.htaccess`:
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteCond %{HTTPS} off
      RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    </IfModule>
    ```

- [ ] vite.config.ts uses `secure: true` for HTTPS proxy

---

## DNS & Domain Configuration

- [ ] Domain pointed to Hostinger nameservers (or A records updated)
- [ ] DNS propagation complete (can take 24-48 hours)
- [ ] Domain accessible without errors

---

## Testing & Verification

### Homepage
- [ ] Visit: `https://maroon-finch-443423.hostingersite.com`
- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Carousel displays properly
- [ ] Hero section images load

### API Testing
- [ ] Check database connection: `/backend/api/v1/admin/check-db.php`
  - Should show: `"admins_table_exists": true`
  - Should list existing admins

- [ ] Test public endpoints:
  - [ ] `/backend/api/v1/hero.php` - Returns hero slides
  - [ ] `/backend/api/v1/categories.php` - Returns categories
  - [ ] `/backend/api/v1/businesses.php` - Returns businesses

- [ ] Browser DevTools (F12) - Check Network tab:
  - [ ] No 404 errors for API calls
  - [ ] API responses are valid JSON
  - [ ] Check Console tab for JavaScript errors

### Admin Panel
- [ ] Access: `https://maroon-finch-443423.hostingersite.com/admin`
- [ ] Login page loads
- [ ] Basic login (admin@salem.local / admin123)
- [ ] Dashboard loads without "401 Unauthorized" errors
- [ ] Statistics display correctly

- [ ] Test each admin page:
  - [ ] Dashboard - Stats showing
  - [ ] Hero Carousel - Can add/edit slides
  - [ ] Categories - Can view and add categories
  - [ ] Businesses - Can view pending/approved
  - [ ] Contacts - Loads list of inquiries
  - [ ] Payments - Shows revenue data
  - [ ] Settings - Can save settings
  - [ ] Pending - Can approve/reject businesses

### User Functions
- [ ] Register Business - Form works and saves to database
- [ ] Submit Contact - Form validates and saves
- [ ] Search - Category/business search works
- [ ] A-Z Directory - Displays businesses by category

### File Operations
- [ ] Image upload in admin works:
  - [ ] Hero carousel image upload
  - [ ] Category image upload
- [ ] Images display correctly on frontend
- [ ] Images stored in correct directories

---

## Monitoring & Logs

- [ ] Monitor Hostinger error logs:
  - [ ] Check for PHP errors: `error.log`
  - [ ] Check for web server errors: `access.log`

- [ ] Monitor admin panel:
  - [ ] Check for failed logins (security)
  - [ ] Monitor database backups

---

## Post-Deployment

- [ ] Clean up debug files (if present):
  - [ ] `backend/api/v1/admin/debug-auth.php`
  - [ ] `backend/api/v1/admin/check-db.php`
  - [ ] `backend/api/v1/admin/test-category.php`
  - [ ] `backend/test-headers.php`

- [ ] Backup database:
  - [ ] Set up automatic Hostinger backups
  - [ ] Take initial manual backup

- [ ] Monitor analytics:
  - [ ] Set up Google Analytics (if needed)
  - [ ] Monitor traffic and errors

- [ ] Security hardening:
  - [ ] Update JWT_SECRET with strong value
  - [ ] Set up firewall rules (if available)
  - [ ] Enable two-factor authentication (if available)

---

## Troubleshooting

### Issue: "Cannot GET /index.html"
**Solution:**
- Verify root `.htaccess` is present
- Check Apache mod_rewrite is enabled
- Verify RewriteBase is correct

### Issue: API returns 404
**Solution:**
- Verify `/backend` folder exists
- Check vite.config.ts proxy path
- Verify .htaccess in /backend exists

### Issue: 401 Unauthorized on admin panel
**Solution:**
- Verify `backend/.htaccess` includes Authorization header setup
- Check Authorization header is being sent (DevTools → Network)
- Verify JWT_SECRET in config.php

### Issue: File upload not working
**Solution:**
- Check upload directory permissions (755)
- Verify `/uploads` directory exists
- Check file size is under limit (5MB)

### Issue: Database connection fails
**Solution:**
- Verify credentials in `backend/config/config.php`
- Test credentials directly in phpMyAdmin
- Check database host is correct

---

## Rollback Plan

If deployment fails:

1. **Revert files:**
   ```
   Restore from version control:
   - vite.config.ts (original localhost version)
   - backend/config/config.php (original settings)
   ```

2. **Restore database:**
   - Use Hostinger backup to restore previous state

3. **Clear caches:**
   - Clear browser cache
   - Clear Hostinger PHP opcode cache (if available)

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Status:** ⬜ Pending | 🟡 In Progress | 🟢 Complete | 🔴 Failed

**Notes:**
