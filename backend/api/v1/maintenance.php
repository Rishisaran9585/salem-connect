<?php
// backend/api/v1/maintenance.php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

handleOptions();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get maintenance mode status (public endpoint - no auth required)
    $stmt = $pdo->prepare("SELECT `value` FROM settings WHERE `key` = 'maintenance_mode'");
    $stmt->execute();
    $result = $stmt->fetch();
    
    $isMaintenanceOn = false;
    if ($result && ($result['value'] === '1' || $result['value'] === 'true')) {
        $isMaintenanceOn = true;
    }
    
    sendResponse(true, [
        'maintenance_mode' => $isMaintenanceOn
    ]);
}
?>
