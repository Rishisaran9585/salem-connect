<?php
// backend/api/v1/admin/test-category.php
// Test endpoint to verify category creation
// REMOVE THIS FILE BEFORE PRODUCTION

require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';

header('Content-Type: application/json');

try {
    // Count existing categories
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM categories");
    $result = $stmt->fetch();
    $count = $result['count'] ?? 0;

    // Get recent categories
    $stmt = $pdo->query("SELECT id, name, slug, image_url, is_active FROM categories ORDER BY created_at DESC LIMIT 10");
    $categories = $stmt->fetchAll();

    echo json_encode([
        'total_categories' => $count,
        'recent_categories' => $categories,
        'database_ok' => true
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
} catch (Exception $e) {
    echo json_encode([
        'error' => $e->getMessage(),
        'database_ok' => false
    ], JSON_PRETTY_PRINT);
}
?>
