<?php
// backend/api/v1/hero.php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

handleOptions();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch only active slides ordered by sort_order
    $stmt = $pdo->query("SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC");
    $slides = $stmt->fetchAll();
    sendResponse(true, $slides);
}
?>
