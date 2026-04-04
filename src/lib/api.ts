// Central API configuration - all backend URLs go through Vite proxy
const API_BASE = "/backend/api/v1";
export const API = {
  // Public
  HERO: `${API_BASE}/hero.php`,
  CATEGORIES: `${API_BASE}/categories.php`,
  BUSINESSES: `${API_BASE}/businesses.php`,
  CONTACT: `${API_BASE}/contact.php`,
  REGISTER: `${API_BASE}/register.php`,
  // Admin
  admin: {
    AUTH: `${API_BASE}/admin/auth.php`,
    STATS: `${API_BASE}/admin/stats.php`,
    BUSINESSES: `${API_BASE}/admin/businesses.php`,
    CATEGORIES: `${API_BASE}/admin/categories.php`,
    HERO: `${API_BASE}/admin/hero.php`,
    CONTACTS: `${API_BASE}/admin/contacts.php`,
    PAYMENTS: `${API_BASE}/admin/payments.php`,
    SETTINGS: `${API_BASE}/admin/settings.php`,
    FILE_UPLOAD: `${API_BASE}/admin/file-upload.php`,
  }
};
