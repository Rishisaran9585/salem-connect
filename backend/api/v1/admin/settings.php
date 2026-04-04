<?php
// backend/api/v1/admin/settings.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all settings
    $stmt = $pdo->query("SELECT `key`, `value`, `data_type` FROM settings");
    $allSettings = $stmt->fetchAll();
    
    $settings = [];
    foreach ($allSettings as $setting) {
        $value = $setting['value'];
        if ($setting['data_type'] === 'boolean') {
            $value = $value === '1' || $value === 'true' ? true : false;
        } else if ($setting['data_type'] === 'number') {
            $value = (int)$value;
        }
        $settings[$setting['key']] = $value;
    }
    
    sendResponse(true, $settings);
} else if ($method === 'POST') {
    // Save/Update multiple settings
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!is_array($data)) {
        sendResponse(false, null, "Settings must be an object", 400);
    }
    
    try {
        $pdo->beginTransaction();
        
        foreach ($data as $key => $value) {
            $dataType = 'string';
            $storeValue = $value;
            
            if (is_bool($value)) {
                $dataType = 'boolean';
                $storeValue = $value ? '1' : '0';
            } else if (is_numeric($value) && !is_string($value)) {
                $dataType = 'number';
                $storeValue = (string)$value;
            } else {
                $storeValue = (string)$value;
            }
            
            $stmt = $pdo->prepare("INSERT INTO settings (`key`, `value`, `data_type`) VALUES (?, ?, ?) 
                                   ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `data_type` = VALUES(`data_type`)");
            $stmt->execute([$key, $storeValue, $dataType]);
        }
        
        $pdo->commit();
        sendResponse(true, $data, "Settings saved successfully");
    } catch (Exception $e) {
        $pdo->rollBack();
        sendResponse(false, null, "Error saving settings: " . $e->getMessage(), 500);
    }
} else if ($method === 'PUT') {
    // Update single setting
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['key']) || !isset($data['value'])) {
        sendResponse(false, null, "Key and value are required", 400);
    }
    
    $key = $data['key'];
    $value = $data['value'];
    $dataType = $data['data_type'] ?? 'string';
    
    $stmt = $pdo->prepare("INSERT INTO settings (`key`, `value`, `data_type`) VALUES (?, ?, ?) 
                           ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `data_type` = VALUES(`data_type`)");
    $stmt->execute([$key, $value, $dataType]);
    
    sendResponse(true, null, "Setting updated");
}
?>
