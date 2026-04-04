<?php
// backend/api/v1/admin/check-db.php
// This is a debug endpoint to check database and auth setup
// REMOVE THIS FILE BEFORE PRODUCTION

require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';

header('Content-Type: application/json');

try {
    // Check if admins table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'admins'");
    $tableExists = $stmt->rowCount() > 0;

    $debug = [
        'admins_table_exists' => $tableExists,
        'jwt_secret_defined' => defined('JWT_SECRET'),
    ];

    if ($tableExists) {
        // Get admin count
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM admins");
        $result = $stmt->fetch();
        $debug['total_admins'] = $result['count'] ?? 0;

        // Get admin list (without passwords)
        $stmt = $pdo->query("SELECT id, username, email FROM admins");
        $debug['admins'] = $stmt->fetchAll();
    }

    echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
} catch (Exception $e) {
    echo json_encode([
        'error' => $e->getMessage(),
        'database_connection' => 'failed'
    ], JSON_PRETTY_PRINT);
}
?>
