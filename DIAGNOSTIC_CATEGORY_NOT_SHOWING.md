# Category Not Showing - Diagnostic Guide

## Issue Summary
You added a category but it's not showing in the Categories page.

## Diagnosis Steps

### Step 1: Check if Category was Actually Saved to Database

1. Visit: `http://localhost:8081/backend/api/v1/admin/test-category.php`
2. You should see JSON output with:
   - `total_categories`: Total count of categories in database
   - `recent_categories`: List of the last 10 categories
   - `database_ok`: true/false

**What to look for:**
- Is your newly added category in the `recent_categories` list?
- If YES → Problem is on the frontend (state/display)
- If NO → Problem is on the backend (database insertion)

### Step 2: Check Browser Console for Errors

1. Press F12 in your browser
2. Go to **Console** tab
3. Try adding a category again
4. Look for:
   - Red error messages
   - Axios errors
   - Response from the API

**Common errors:**
```
Error adding category: AxiosError: 401
→ Authentication/token issue

Error adding category: TypeError: Cannot read property 'data' of undefined
→ No response received from API

Fetched categories: [...] 
→ Shows what was fetched
```

### Step 3: Check Network Tab

1. Press F12 → **Network** tab
2. Try adding a category
3. Look for the POST request to `/backend/api/v1/admin/categories`
4. Click it and check:
   - **Status**: Should be 200
   - **Response**: Should show `"success": true`
   - **Request Headers**: Should have `Authorization: Bearer [token]`

**If Status is 401:**
→ Token authentication issue (see 401 troubleshooting doc)

**If Status is 500:**
→ Backend error, check PHP error logs

**If Response is `"success": false`:**
→ API rejected the data, check the message field

### Step 4: Check for Backend Errors

Look in Apache error log:
- **Windows XAMPP**: `C:\xampp\apache\logs\error.log`

PHP error log:
- **Windows XAMPP**: `C:\xampp\php\logs\php_error.log`

Common backend errors:
- "Slug already exists" → Category name already used
- "INSERT INTO categories" errors → Table structure issue
- "Filename exceeds" → Image file naming issue

### Step 5: Manual Test with curl

Test the add category endpoint directly:

```powershell
# Get your token first
$token = localStorage.getItem('admin_token')  # Copy from browser console

# Test category creation
curl -X POST http://localhost:8081/backend/api/v1/admin/categories `
  -H "Authorization: Bearer YOUR_TOKEN_HERE" `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Test Category",
    "icon": "test",
    "image_url": "",
    "description": "Test description"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 123,
    "name": "Test Category",
    "slug": "test-category",
    "icon": "test",
    "image_url": "",
    "is_active": 1,
    "created_at": "2026-04-03 10:30:00"
  }
}
```

## Common Issues & Solutions

### Issue: Category saved but not showing in the list

**Cause 1: Frontend state not updating**
- Solution: Try refreshing the page (F5)
- If it appears after refresh → State management issue
- Check browser console for errors

**Cause 2: Image URL issue**
- If you uploaded an image, the URL might be incorrect
- Temporary: Try adding category WITHOUT image
- Check if image was actually uploaded to `/backend/uploads/categories/`

**Cause 3: Slug conflict**
- If a category with similar name exists, slug might duplicate
- Error message: "Slug already exists: [error]"
- Solution: Use a different category name

### Issue: "Error adding category" toast appears

**Means:** The API call failed
- Check Network tab for exact error response
- Look at response JSON for error message
- Common: 401 Auth fail, 500 Server error

### Issue: Category appears in database but not in list

**Means:** Frontend fetch is failing or outdated
- Try refreshing the page
- Check if fetch endpoint is correct: `/backend/api/v1/admin/categories`
- Check Network tab → GET to categories → verify response includes new category

## Verification Checklist

- [ ] Token exists in localStorage at `admin_token`
- [ ] POST request returns status 200
- [ ] POST response has `"success": true`
- [ ] Test endpoint shows category in database
- [ ] GET request returns all categories including new one
- [ ] Browser console shows no red errors
- [ ] Image (if uploaded) is in `/backend/uploads/categories/`

## Backend Code Changes Made

✅ Updated `/backend/api/v1/admin/categories.php`:
1. POST now returns full category object instead of just ID
2. Better error handling
3. Added debug console logging on frontend
4. Frontend now awaits fetchCategories() properly

✅ Updated `/src/pages/admin/AdminCategories.tsx`:
1. Added console.log for debugging
2. Better error messages in toast
3. Proper error handling with detailed messages in console

## If Still Not Working

1. **Check if database is actually being used:**
   - Visit test-category.php endpoint
   - Verify total_categories count increases when you add

2. **Check if GET endpoint is working:**
   - Call `/backend/api/v1/admin/categories` directly in browser
   - Verify it returns valid JSON with all categories

3. **Check authentication:**
   - Visit `/backend/api/v1/admin/check-db.php`
   - Ensure admin user exists

4. **Try without image:**
   - Add category name only, no image
   - If this works, image upload is the issue

5. **Clear everything and try again:**
   - Clear localStorage: `localStorage.clear()`
   - Clear browser cache: Ctrl+Shift+Delete
   - Restart XAMPP Apache
   - Login again and try adding

## After Issues Resolved

Delete these debug files:
- `backend/api/v1/admin/test-category.php`
- `backend/api/v1/admin/debug-auth.php`
- `backend/api/v1/admin/check-db.php`
- `backend/test-headers.php` (if exists)

---

**Report your findings from Step 1** to determine if it's a backend or frontend issue!
