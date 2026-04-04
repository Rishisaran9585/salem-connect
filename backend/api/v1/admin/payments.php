<?php
// backend/api/v1/admin/payments.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all payments with optional filter
    $status = $_GET['status'] ?? 'all';
    
    $sql = "SELECT b.id, b.business_name, b.payment_status, b.payment_amount, b.payment_method, b.created_at,
            CONCAT('TXN-', LPAD(b.id, 3, '0')) as transaction_id
            FROM businesses b 
            WHERE b.payment_amount > 0";
    
    $params = [];
    
    if ($status !== 'all') {
        $sql .= " AND b.payment_status = ?";
        $params[] = $status;
    }
    
    $sql .= " ORDER BY b.created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $payments = $stmt->fetchAll();
    
    // Calculate totals
    $stmtTotal = $pdo->query("SELECT SUM(payment_amount) as total FROM businesses WHERE payment_status = 'paid'");
    $totalRevenue = $stmtTotal->fetch()['total'] ?? 0;
    
    $stmtMonth = $pdo->query("SELECT SUM(payment_amount) as total FROM businesses WHERE payment_status = 'paid' AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())");
    $monthRevenue = $stmtMonth->fetch()['total'] ?? 0;
    
    $stmtPending = $pdo->query("SELECT SUM(payment_amount) as total FROM businesses WHERE payment_status = 'pending'");
    $pendingRevenue = $stmtPending->fetch()['total'] ?? 0;
    
    sendResponse(true, [
        'payments' => $payments,
        'totals' => [
            'total_revenue' => (float)$totalRevenue,
            'month_revenue' => (float)$monthRevenue,
            'pending_revenue' => (float)$pendingRevenue
        ]
    ]);
} else if ($method === 'PUT') {
    // Update payment status
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendResponse(false, null, "Business ID is required", 400);
    }
    
    $id = $data['id'];
    $status = $data['payment_status'] ?? null;
    
    if ($status) {
        $stmt = $pdo->prepare("UPDATE businesses SET payment_status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        sendResponse(true, null, "Payment status updated");
    } else {
        sendResponse(false, null, "Payment status is required", 400);
    }
}
?>
