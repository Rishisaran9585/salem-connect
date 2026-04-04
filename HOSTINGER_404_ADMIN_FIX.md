# Admin Panel 404 Error - Hostinger Troubleshooting

**Error:** "Page not found" when accessing `/admin`

This means the routing isn't working correctly. Let's diagnose and fix it.

---

## Quick Diagnosis

The admin panel runs as a single-page application (SPA). When you visit `/admin`, there's no actual `/admin` folder - the frontend router handles it.

**For this to work, Apache must:**
1. ✅ Rewrite `/admin` requests to `index.html`
2. ✅ Allow the React router to handle the URL

---

## Step 1: Check Your File Structure on Hostinger

**In your Hostinger File Manager, check what's in `/public_html/`:**

### If you uploaded a `dist/` folder:
```
/public_html/
├── dist/
│   ├── index.html
│   ├── backend/
│   └── ...
```
**Problem:** Files are in subdirectory  
**Solution:** Move files UP so structure is correct (see Step 2)

### If you uploaded files directly (CORRECT):
```
/public_html/
├── index.html
├── backend/
│   ├── api/
│   ├── config/
│   ├── includes/
│   ├── uploads/
│   └── .htaccess
├── sql/
├── public/
├── src/ (optional)
├── assets/ (if exists)
└── .htaccess (ROOT)
```

**Which structure do you have?**

---

## Step 2: Fix File Structure (If Needed)

If files are in a `dist/` subfolder or `salem-connect/` subfolder:

1. **Via File Manager:**
   - Select all files inside the subfolder
   - Cut (Ctrl+X)
   - Navigate to `/public_html/`
   - Paste (Ctrl+V)
   - Delete the empty subfolder

2. **Via FTP:**
   - Same process: move everything UP one level

3. **Via SSH (if available):**
   ```bash
   cd /public_html/
   mv salem-connect/* .
   rm -rf salem-connect/
   # Or if in dist folder:
   mv dist/* .
   rm -rf dist/
   ```

---

## Step 3: Verify Root `.htaccess`

**Check if `.htaccess` exists in `/public_html/`**

If NOT, create it:

1. **File Manager → Create New File:**
   - Name: `.htaccess` (with the dot at start)
   - Content (below)

2. **Upload via FTP:**
   - Create `.htaccess` locally
   - Upload to `/public_html/`

**Content for root `.htaccess`:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite existing files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite everything else to index.html
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

---

## Step 4: Verify Backend `.htaccess`

**Check if `.htaccess` exists in `/public_html/backend/`**

If NOT, create it:

**Content for backend `.htaccess`:**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /backend/
    
    # Don't rewrite actual files or directories
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Allow direct access to PHP files
    RewriteCond %{REQUEST_FILENAME} \.php$ [OR]
    RewriteRule . - [L]
</IfModule>

# Pass Authorization header for JWT
<IfModule mod_headers.c>
    SetEnvIf Authorization ^(.*)$ HTTP_AUTHORIZATION=$1
</IfModule>
```

---

## Step 5: Test the Fix

After creating/verifying `.htaccess`:

1. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Select "All time"
   - Check "Cookies and other site data"
   - Click "Clear data"

2. **Hard refresh:**
   - Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)

3. **Test URLs:**
   - Homepage: `https://maroon-finch-443423.hostingersite.com/` → Should load
   - Admin: `https://maroon-finch-443423.hostingersite.com/admin` → Should load login
   - Categories: `https://maroon-finch-443423.hostingersite.com/categories` → Should load

---

## Step 6: Verify mod_rewrite is Enabled

If `.htaccess` is correct but still getting 404:

**Test if mod_rewrite works:**

Create file `/public_html/test-rewrite.php`:
```php
<?php
echo "mod_rewrite is ";
echo extension_loaded('mod_rewrite') ? "ENABLED ✓" : "DISABLED ✗";
echo "<br>";
echo "RewriteEngine: ";
echo (apache_get_modules() && in_array('mod_rewrite', apache_get_modules())) ? "ENABLED ✓" : "DISABLED ✗";
?>
```

Access: `https://maroon-finch-443423.hostingersite.com/test-rewrite.php`

**If DISABLED:**
- Contact Hostinger support
- Request to enable `mod_rewrite` and `mod_headers`
- Wait for response and retry

---

## Step 7: Check index.html Exists

In File Manager, verify:
- ✅ `/public_html/index.html` exists
- ✅ It's the React app's index.html (not a directory listing)

If file is missing or looks wrong:
- Re-upload from your `dist/` folder (if you built locally)
- Or rebuild: `npm run build` (then re-upload)

---

## Step 8: Verify Backend Connection

If homepage loads but error in console about API:

Test backend directly:
```
https://maroon-finch-443423.hostingersite.com/backend/api/v1/hero.php
```

**Should show:**
```json
{
  "success": true,
  "message": "",
  "data": [...]
}
```

**If 404 or error:**
- Check `/backend` folder exists
- Verify file names are correct
- Check PHP errors in Hostinger error log

---

## Troubleshooting Flowchart

```
404 Error on /admin?
│
├─ Step 1: Is index.html in /public_html root?
│  └─ NO → Move files up one level (from dist/ or subdirectory)
│  └─ YES → Go to Step 2
│
├─ Step 2: Does /public_html/.htaccess exist?
│  └─ NO → Create it with rewrite rules
│  └─ YES → Verify content is correct → Go to Step 3
│
├─ Step 3: Is mod_rewrite enabled?
│  └─ NO → Contact Hostinger support
│  └─ YES → Go to Step 4
│
├─ Step 4: Clear browser cache and hard refresh
│  └─ Still 404? → Check Hostinger error logs
│
└─ If all steps done: Issue likely in .htaccess rules
   └─ Try the simpler .htaccess at bottom of this guide
```

---

## Diagnostic Checklist

Run through this to find the issue:

```
File Structure:
- [ ] index.html in /public_html/ root
- [ ] Not in subdirectory (dist/, salem-connect/, etc.)
- [ ] backend/ folder in /public_html/ root
- [ ] sql/ folder exists
- [ ] public/ folder exists

.htaccess Files:
- [ ] .htaccess exists in /public_html/
- [ ] .htaccess exists in /public_html/backend/
- [ ] .htaccess exists in /public_html/backend/uploads/
- [ ] Content matches what's in this guide

Apache Configuration:
- [ ] mod_rewrite enabled (test with test-rewrite.php)
- [ ] mod_headers enabled (for Authorization)
- [ ] PHP 7.4+ (test with phpinfo())

Browser:
- [ ] Cache cleared (Ctrl+Shift+Delete)
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Try different browser
- [ ] Check DevTools → Network tab for actual requests
```

---

## Most Common Fix

95% of the time, the issue is:

**`.htaccess` file doesn't exist or is in wrong location**

**Solution:**
1. Create `.htaccess` in `/public_html/` with the rewrite rules above
2. Clear browser cache
3. Hard refresh
4. Done!

---

## If Still Not Working

**Provide these details:**

1. **What's in `/public_html/`?**
   - List all files/folders (screenshot from File Manager)

2. **Does `.htaccess` exist?**
   - Show its content

3. **What's the exact error?**
   - "Page not found" from Hostinger?
   - Blank page?
   - Error 500?

4. **Check Hostinger error log:**
   - File Manager → Logs → error.log
   - Copy last 50 lines

5. **Browser DevTools:**
   - F12 → Network tab
   - Try loading `/admin`
   - Show what request was made and response

---

## Alternative: Use Simpler Configuration

If the above doesn't work, try this simpler `.htaccess`:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d  
RewriteRule . index.html [L]
```

---

## Delete Test Files After Fixed

Once admin loads successfully:
```
/public_html/test-rewrite.php  (DELETE)
/public_html/backend/test-headers.php  (DELETE, if exists)
/public_html/backend/api/v1/admin/debug-auth.php  (DELETE)
/public_html/backend/api/v1/admin/check-db.php  (DELETE)
```

---

**Start with Step 1-3, then test. Let me know what you find!**
