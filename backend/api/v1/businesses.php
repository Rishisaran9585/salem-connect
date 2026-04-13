<?php
// backend/api/v1/businesses.php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

handleOptions();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['slug'])) {
        $slug = $_GET['slug'];
        $stmt = $pdo->prepare("SELECT b.*, c.name as category_name, s.name as subcategory_name 
                               FROM businesses b 
                               LEFT JOIN categories c ON b.category_id = c.id 
                               LEFT JOIN subcategories s ON b.subcategory_id = s.id 
                               WHERE b.slug = ? AND b.status IN ('approved', 'pending')");
        $stmt->execute([$slug]);
        $business = $stmt->fetch();
        
        if ($business) {
            sendResponse(true, $business);
        } else {
            sendResponse(false, null, "Business not found", 404);
        }
    } else if (isset($_GET['category'])) {
        $categorySlug = $_GET['category'];
        $stmt = $pdo->prepare("SELECT b.*, c.name as category_name 
                               FROM businesses b 
                               JOIN categories c ON b.category_id = c.id 
                               WHERE c.slug = ? AND b.status IN ('approved', 'pending') 
                               ORDER BY b.business_name ASC");
        $stmt->execute([$categorySlug]);
        $businesses = $stmt->fetchAll();
        sendResponse(true, $businesses);
    } else if (isset($_GET['search'])) {
        $query = '%' . $_GET['search'] . '%';
        $stmt = $pdo->prepare("SELECT b.*, c.name as category_name 
                               FROM businesses b 
                               LEFT JOIN categories c ON b.category_id = c.id 
                               WHERE (b.business_name LIKE ? OR b.description LIKE ? OR c.name LIKE ?) 
                               AND b.status IN ('approved', 'pending') 
                               ORDER BY b.business_name ASC");
        $stmt->execute([$query, $query, $query]);
        $businesses = $stmt->fetchAll();
        sendResponse(true, $businesses);
    } else {
        $stmt = $pdo->query("SELECT b.*, c.name as category_name 
                             FROM businesses b 
                             LEFT JOIN categories c ON b.category_id = c.id 
                             WHERE b.status IN ('approved', 'pending') 
                             ORDER BY b.created_at DESC LIMIT 20");
        $businesses = $stmt->fetchAll();
        sendResponse(true, $businesses);
    }
}
?>
