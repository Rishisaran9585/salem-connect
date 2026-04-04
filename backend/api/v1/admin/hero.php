<?php
// backend/api/v1/admin/hero.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
$admin = authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all slides (including inactive ones)
    $stmt = $pdo->query("SELECT * FROM hero_slides ORDER BY sort_order ASC, created_at DESC");
    $slides = $stmt->fetchAll();
    sendResponse(true, $slides);
} else if ($method === 'POST') {
    // Add new slide
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['image_url']) || empty($data['image_url'])) {
        sendResponse(false, null, "Image URL is required", 400);
    }
    
    $imageUrl = $data['image_url'];
    $title = $data['title'] ?? '';
    $subtitle = $data['subtitle'] ?? '';
    $sortOrder = $data['sort_order'] ?? 0;
    
    $stmt = $pdo->prepare("INSERT INTO hero_slides (image_url, title, subtitle, sort_order) VALUES (?, ?, ?, ?)");
    $stmt->execute([$imageUrl, $title, $subtitle, $sortOrder]);
    sendResponse(true, ['id' => $pdo->lastInsertId()], "Slide added successfully");
} else if ($method === 'PUT') {
    // Update slide
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendResponse(false, null, "Slide ID is required", 400);
    }
    
    $id = $data['id'];
    $imageUrl = $data['image_url'];
    $title = $data['title'] ?? '';
    $subtitle = $data['subtitle'] ?? '';
    $sortOrder = $data['sort_order'] ?? 0;
    $isActive = $data['is_active'] ?? 1;
    
    $stmt = $pdo->prepare("UPDATE hero_slides SET image_url = ?, title = ?, subtitle = ?, sort_order = ?, is_active = ? WHERE id = ?");
    $stmt->execute([$imageUrl, $title, $subtitle, $sortOrder, $isActive, $id]);
    sendResponse(true, null, "Slide updated successfully");
} else if ($method === 'DELETE') {
    // Delete slide
    if (!isset($_GET['id'])) {
        sendResponse(false, null, "ID is required", 400);
    }
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM hero_slides WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(true, null, "Slide deleted successfully");
}
?>
