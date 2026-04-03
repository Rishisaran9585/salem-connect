<?php
// backend/api/v1/admin/categories.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php'; // JWT verification

handleOptions();
$admin = authenticate(); // Returns admin payload from JWT

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all categories (protected list)
    $stmt = $pdo->query("SELECT * FROM categories ORDER BY sort_order ASC");
    $categories = $stmt->fetchAll();
    sendResponse(true, $categories);
} else if ($method === 'POST') {
    // Add new category
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['name']) || empty($data['name'])) {
        sendResponse(false, null, "Category name is required", 400);
    }
    
    $name = $data['name'];
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    $icon = $data['icon'] ?? 'folder';
    $imageUrl = $data['image_url'] ?? '';
    $description = $data['description'] ?? '';
    
    $stmt = $pdo->prepare("INSERT INTO categories (name, slug, icon, image_url, description) VALUES (?, ?, ?, ?, ?)");
    try {
        $stmt->execute([$name, $slug, $icon, $imageUrl, $description]);
        $newId = $pdo->lastInsertId();
        sendResponse(true, ['id' => $newId], "Category created successfully");
    } catch (PDOException $e) {
        sendResponse(false, null, "Slug already exists: " . $e->getMessage(), 500);
    }
} else if ($method === 'PUT') {
    // Update category
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendResponse(false, null, "ID is required", 400);
    }
    
    $id = $data['id'];
    $name = $data['name'];
    $icon = $data['icon'] ?? 'folder';
    $imageUrl = $data['image_url'] ?? '';
    
    $stmt = $pdo->prepare("UPDATE categories SET name = ?, icon = ?, image_url = ? WHERE id = ?");
    $stmt->execute([$name, $icon, $imageUrl, $id]);
    sendResponse(true, null, "Category updated successfully");
} else if ($method === 'DELETE') {
    // DELETE category
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        sendResponse(true, null, "Category deleted");
    }
}
?>
