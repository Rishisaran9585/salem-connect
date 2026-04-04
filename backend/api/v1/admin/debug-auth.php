<?php
// backend/api/v1/admin/debug-auth.php
// This is a debug endpoint to test authentication
// REMOVE THIS FILE BEFORE PRODUCTION

require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';

header('Content-Type: application/json');

$debug = [
    'php_sapi_name' => php_sapi_name(),
    'server_request_method' => $_SERVER['REQUEST_METHOD'],
    'all_headers' => [],
    'http_authorization' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET',
    'authorization' => $_SERVER['AUTHORIZATION'] ?? 'NOT SET',
];

// Try to get all headers
if (function_exists('getallheaders')) {
    $debug['getallheaders_result'] = getallheaders();
}

// Show all $_SERVER vars that start with HTTP_
foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0 || strpos($key, 'CONTENT_') === 0) {
        $debug['server_vars'][$key] = $value;
    }
}

echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
