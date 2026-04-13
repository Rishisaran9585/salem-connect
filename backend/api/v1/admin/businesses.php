<?php
// backend/api/v1/admin/businesses.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List businesses with optional filter
    $status = $_GET['status'] ?? 'all';
    $search = $_GET['search'] ?? '';
    
    $sql = "SELECT b.*, b.is_verified as verified, c.name as category_name 
            FROM businesses b 
            LEFT JOIN categories c ON b.category_id = c.id 
            WHERE 1=1";
    
    $params = [];
    
    if ($status !== 'all') {
        $sql .= " AND b.status = ?";
        $params[] = $status;
    }
    
    if (!empty($search)) {
        $sql .= " AND (b.business_name LIKE ? OR b.owner_name LIKE ? OR b.email LIKE ? OR b.mobile LIKE ?)";
        $searchParam = '%' . $search . '%';
        $params[] = $searchParam;
        $params[] = $searchParam;
        $params[] = $searchParam;
        $params[] = $searchParam;
    }
    
    $sql .= " ORDER BY b.created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $businesses = $stmt->fetchAll();
    
    // Explicitly parse is_verified to boolean mapping if PDO returned strings
    foreach ($businesses as &$biz) {
        $biz['verified'] = (bool)$biz['verified'];
    }
    
    sendResponse(true, $businesses);
} else if ($method === 'PUT') {
    // Approve or Reject or Update business
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendResponse(false, null, "Business ID is required", 400);
    }
    
    $id = $data['id'];
    $status = $data['status'] ?? null;
    $verified = $data['verified'] ?? null;
    
    $updateFields = [];
    $params = [];
    
    if ($status) {
        $updateFields[] = "status = ?";
        $params[] = $status;
    }
    
    if ($verified !== null) {
        $updateFields[] = "is_verified = ?";
        $params[] = $verified ? 1 : 0;
    }
    
    if (empty($updateFields)) {
        sendResponse(false, null, "No updates provided", 400);
    }
    
    $params[] = $id;
    $sql = "UPDATE businesses SET " . implode(", ", $updateFields) . " WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    sendResponse(true, null, "Business updated successfully");
} else if ($method === 'DELETE') {
    // Delete business
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM businesses WHERE id = ?");
        $stmt->execute([$id]);
        sendResponse(true, null, "Business deleted");
    }
}
?>
