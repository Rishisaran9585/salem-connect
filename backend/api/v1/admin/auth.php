<?php
// backend/api/v1/admin/auth.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php'; // Simplified JWT functions

handleOptions();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['email']) || !isset($data['password'])) {
        sendResponse(false, null, "Email and password are required", 400);
    }
    
    $email = $data['email'];
    $password = $data['password'];
    
    // In our schema.sql, the field is 'password' (bcrypt hash)
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();
    
    if ($admin && password_verify($password, $admin['password'])) {
        // Success - Generate Simulation JWT
        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = base64_encode(json_encode([
            'id' => $admin['id'],
            'email' => $admin['email'],
            'exp' => time() + 86400
        ]));
        $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
        $token = "$header.$payload.$signature";
        
        sendResponse(true, [
            'token' => $token,
            'admin' => [
                'id' => $admin['id'],
                'username' => $admin['username'],
                'email' => $admin['email']
            ]
        ], "Login successful");
    } else {
        // If login fails, check if the password is plain text (for initial dev)
        if ($admin && $password === $admin['password']) {
             // Success with plain text (optional but helpful for initial seeding)
            $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
            $payload = base64_encode(json_encode(['id' => $admin['id'], 'email' => $admin['email'], 'exp' => time() + 86400]));
            $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
            $token = "$header.$payload.$signature";
            
            sendResponse(true, [
                'token' => $token,
                'admin' => [
                    'id' => $admin['id'],
                    'username' => $admin['username'],
                    'email' => $admin['email']
                ]
            ], "Login successful");
            return;
        }
        sendResponse(false, null, "Invalid credentials", 401);
    }
}
?>
