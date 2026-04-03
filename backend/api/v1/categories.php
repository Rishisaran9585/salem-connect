<?php
// backend/api/v1/categories.php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

handleOptions();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['slug'])) {
        $slug = $_GET['slug'];
        $stmt = $pdo->prepare("SELECT * FROM categories WHERE slug = ?");
        $stmt->execute([$slug]);
        $category = $stmt->fetch();
        
        if ($category) {
            $stmtSub = $pdo->prepare("SELECT * FROM subcategories WHERE category_id = ?");
            $stmtSub->execute([$category['id']]);
            $category['subcategories'] = $stmtSub->fetchAll();
            sendResponse(true, $category);
        } else {
            sendResponse(false, null, "Category not found", 404);
        }
    } else {
        $stmt = $pdo->query("SELECT * FROM categories ORDER BY sort_order ASC, name ASC");
        $categories = $stmt->fetchAll();
        sendResponse(true, $categories);
    }
}
?>
