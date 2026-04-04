<?php
// backend/api/v1/admin/contacts.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all contacts with optional filter
    $status = $_GET['status'] ?? 'all';
    
    $sql = "SELECT * FROM contacts WHERE 1=1";
    $params = [];
    
    if ($status !== 'all') {
        $sql .= " AND status = ?";
        $params[] = $status;
    }
    
    $sql .= " ORDER BY created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $contacts = $stmt->fetchAll();
    
    sendResponse(true, $contacts);
} else if ($method === 'PUT') {
    // Update contact status
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendResponse(false, null, "Contact ID is required", 400);
    }
    
    $id = $data['id'];
    $status = $data['status'] ?? null;
    
    if ($status) {
        $stmt = $pdo->prepare("UPDATE contacts SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        sendResponse(true, null, "Contact status updated");
    } else {
        sendResponse(false, null, "Status is required", 400);
    }
} else if ($method === 'DELETE') {
    // Delete contact
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        sendResponse(false, null, "Contact ID is required", 400);
    }
    
    $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(true, null, "Contact deleted");
}
?>
