# Admin Dashboard 401 Error - Troubleshooting Guide

## Problem
Dashboard shows: `401 (Unauthorized)` error when fetching stats

```
GET http://localhost:8081/backend/api/v1/admin/stats.php 401 (Unauthorized)
Error fetching dashboard stats: AxiosError: Request failed with status code 401
```

## Root Cause
The Authorization header (Bearer token) isn't being properly passed from the frontend to the backend PHP script.

## Solution Steps

### Step 1: Enable Authorization Header in Apache (XAMPP)
XAMPP sometimes strips the Authorization header by default. Follow these steps:

#### Option A: Using .htaccess (Recommended)
✅ **DONE** - A `.htaccess` file has been created at `backend/.htaccess` with:
```apache
<IfModule mod_headers.c>
    SetEnvIf Authorization ^(.*)$ HTTP_AUTHORIZATION=$1
</IfModule>
```

This ensures the Authorization header is passed to PHP as `$_SERVER['HTTP_AUTHORIZATION']`

#### Option B: Using Apache Configuration (If .htaccess doesn't work)
If .htaccess fails, you may need to edit Apache config:

**Windows XAMPP Path:** `C:\xampp\apache\conf\httpd.conf`

Find and uncomment (remove the #):
```apache
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
```

Then restart Apache.

### Step 2: Verify Your Setup

1. **Check if database and admins table exist:**
   - Open browser: `http://localhost:8081/backend/api/v1/admin/check-db.php`
   - You should see JSON output showing admin users

2. **Check if Authorization header is being received:**
   - Create a test token first, OR
   - Open browser: `http://localhost:8081/backend/api/v1/admin/debug-auth.php`
   - Look for `HTTP_AUTHORIZATION` in the output

### Step 3: Test Authentication Flow

**Step 3a: Login to get a token**
```bash
# Via PowerShell or curl:
curl -X POST http://localhost:8081/backend/api/v1/admin/auth.php `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@salem.local","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGc...",
    "admin": { "id": 1, "username": "admin", "email": "admin@salem.local" }
  }
}
```

**Step 3b: Use the token to call stats endpoint**
```bash
curl -X GET http://localhost:8081/backend/api/v1/admin/stats.php `
  -H "Authorization: Bearer eyJhbGc..." `
  -H "Content-Type: application/json"
```

Expected response:
```json
{
  "success": true,
  "message": "",
  "data": { "stats": {...}, "monthly_registrations": [...], "recent_businesses": [...] }
}
```

### Step 4: Check the Frontend Token

1. Open browser DevTools (F12)
2. Go to **Application** → **Local Storage**
3. Look for key: `admin_token`
4. Verify the value exists and isn't empty

If empty or missing:
- You haven't logged in yet
- Go to `http://localhost:8081/admin` and login

### Step 5: Verify PHP Can Access Headers

Test if PHP can read Authorization header:

Create a test file at `backend/test-headers.php`:
```php
<?php
echo json_encode([
    'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET',
    'AUTHORIZATION' => $_SERVER['AUTHORIZATION'] ?? 'NOT SET',
    'all_headers' => getallheaders()
]);
?>
```

Then call it with Authorization header:
```bash
curl -H "Authorization: Bearer test123" http://localhost:8081/backend/test-headers.php
```

You should see the Bearer token in the output. If not, Apache isn't passing it through.

## Common Issues & Fixes

### Issue: Still getting 401 after .htaccess
**Solution:**
1. Restart Apache (XAMPP Control Panel → Stop Apache → Start Apache)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh the admin dashboard (Ctrl+Shift+R)

### Issue: Token exists but still 401
**Solution:**
Check if token is valid:
```bash
curl -X POST http://localhost:8081/backend/api/v1/admin/auth.php `
  -H "Content-Type: application/json" `
  -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD"}'
```

Copy the new token and test with it.

### Issue: "Invalid token format" error
**Cause:** The Bearer token in the request doesn't have the right format
**Solution:** Ensure it's sent as: `Authorization: Bearer [TOKEN]` (with space between Bearer and token)

### Issue: "Token expired" error
**Cause:** JWT token has expiration of 24 hours
**Solution:** Login again to get a new token:
```javascript
// In browser console:
localStorage.removeItem('admin_token');
// Then refresh the page and login again
```

### Issue: "Missing Authorization header" error
**Cause:** The Authorization header isn't being sent from frontend
**Solution:**
1. Check AdminDashboard.tsx - verify token is loaded from localStorage
2. Check network tab (DevTools → Network) - verify Authorization header is in the request
3. If not in the request, the problem is on the frontend, not backend

## Verification Checklist

- [ ] Apache modules `mod_rewrite` and `mod_headers` are enabled
- [ ] `.htaccess` file exists at `backend/.htaccess`
- [ ] `Authorization` header is in `$_SERVER` array (check with debug-auth.php)
- [ ] Admin user exists in database (check with check-db.php)
- [ ] Token is generated correctly on login
- [ ] Token is stored in localStorage as `admin_token`
- [ ] Dashboard sends Authorization header in requests
- [ ] Stats API returns 200 OK with data

## After Fixes

Once everything works:

1. **Delete debug files:**
   - `backend/api/v1/admin/debug-auth.php`
   - `backend/api/v1/admin/check-db.php`
   - `backend/test-headers.php`

2. **Test the dashboard:**
   - Login to `http://localhost:8081/admin`
   - Dashboard should load without 401 errors
   - All pages should show data from the API

## Backend Code Changes

✅ **Already Fixed:**
1. Updated `backend/includes/auth.php` to:
   - Check `$_SERVER['HTTP_AUTHORIZATION']` first (most reliable)
   - Check `$_SERVER['AUTHORIZATION']` second
   - Use `getallheaders()` as fallback
   - Verify JWT signature for security
   - Provide detailed error messages

2. Updated `backend/includes/response.php`:
   - Ensures CORS headers are set on all responses

3. Created `.htaccess` in backend folder:
   - Passes Authorization header to PHP

---

**If problems persist after all steps, check Apache error logs:**
- Windows XAMPP: `C:\xampp\apache\logs\error.log`
- Linux: `/var/log/apache2/error.log`

The error log will show if there are technical issues preventing the header from being passed.
