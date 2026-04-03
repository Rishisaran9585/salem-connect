<?php
// backend/api/v1/admin/auth.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../../vendor/autoload.php'; // For JWT support

use Firebase\JWT\JWT;

handleOptions();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['email']) || !isset($data['password'])) {
        sendResponse(false, null, "Email and password are required", 400);
    }
    
    $email = $data['email'];
    $password = $data['password'];
    
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();
    
    if ($admin && password_verify($password, $admin['password_hash'])) {
        // Success - Generate JWT
        $payload = [
            'id' => $admin['id'],
            'email' => $admin['email'],
            'role' => $admin['role'],
            'exp' => time() + JWT_EXPIRY
        ];
        
        $token = JWT::encode($payload, JWT_SECRET, 'HS256');
        
        // Update last login
        $pdu_update = $pdo->prepare("UPDATE admins SET last_login = NOW() WHERE id = ?");
        $pdu_update->execute([$admin['id']]);
        
        sendResponse(true, [
            'token' => $token,
            'admin' => [
                'id' => $admin['id'],
                'name' => $admin['name'],
                'email' => $admin['email'],
                'role' => $admin['role']
            ]
        ], "Login successful");
    } else {
        sendResponse(false, null, "Invalid credentials", 401);
    }
}
?>
