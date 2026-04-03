<?php
// backend/api/v1/admin/stats.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Collect all statistics for the dashboard
    
    // Total Businesses
    $stmtBusinesses = $pdo->query("SELECT COUNT(*) FROM businesses");
    $totalBusinesses = $stmtBusinesses->fetchColumn();
    
    // Pending Approvals
    $stmtPending = $pdo->query("SELECT COUNT(*) FROM businesses WHERE status = 'pending'");
    $pendingApprovals = $stmtPending->fetchColumn();
    
    // New Today
    $stmtToday = $pdo->query("SELECT COUNT(*) FROM businesses WHERE DATE(created_at) = CURDATE()");
    $newToday = $stmtToday->fetchColumn();
    
    // Total Revenue (assuming all approved/verified are paid)
    $stmtRevenue = $pdo->query("SELECT SUM(payment_amount) FROM businesses WHERE payment_status = 'paid'");
    $totalRevenue = $stmtRevenue->fetchColumn() ?: 0;
    
    // Total Categories
    $stmtCategories = $pdo->query("SELECT COUNT(*) FROM categories");
    $totalCategories = $stmtCategories->fetchColumn();
    
    // Contact Inquiries (New)
    $stmtContacts = $pdo->query("SELECT COUNT(*) FROM contacts WHERE status = 'new'");
    $newContacts = $stmtContacts->fetchColumn();
    
    // Monthly Registrations (Last 6 Months)
    $stmtMonthly = $pdo->query("
        SELECT DATE_FORMAT(created_at, '%b %Y') as month, COUNT(*) as count 
        FROM businesses 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%b %Y')
        ORDER BY MIN(created_at)
    ");
    $monthlyRegistrations = $stmtMonthly->fetchAll();
    
    // Recent Businesses
    $stmtRecent = $pdo->query("
        SELECT b.*, c.name as category_name 
        FROM businesses b 
        LEFT JOIN categories c ON b.category_id = c.id 
        ORDER BY b.created_at DESC 
        LIMIT 5
    ");
    $recentBusinesses = $stmtRecent->fetchAll();
    
    sendResponse(true, [
        'stats' => [
            'total_businesses' => $totalBusinesses,
            'pending_approvals' => $pendingApprovals,
            'new_today' => $newToday,
            'total_revenue' => $totalRevenue,
            'total_categories' => $totalCategories,
            'new_contacts' => $newContacts,
        ],
        'monthly_registrations' => $monthlyRegistrations,
        'recent_businesses' => $recentBusinesses
    ]);
}
?>
