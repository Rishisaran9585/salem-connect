<?php
// backend/includes/auth.php

function authenticate() {
    $authHeader = '';
    
    // 1. Check $_SERVER['HTTP_AUTHORIZATION']
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    // 2. Check REDIRECT_HTTP_AUTHORIZATION
    elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    // 3. Check $_SERVER['AUTHORIZATION']
    elseif (!empty($_SERVER['AUTHORIZATION'])) {
        $authHeader = $_SERVER['AUTHORIZATION'];
    }
    // 4. Try apache_request_headers()
    elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $authHeader = $value;
                break;
            }
        }
    }
    // 5. Use getallheaders()
    elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $authHeader = $value;
                break;
            }
        }
    }
    // 6. Last Resort: Check $_GET['token']
    elseif (!empty($_GET['token'])) {
        $authHeader = 'Bearer ' . $_GET['token'];
    }

    if (empty($authHeader)) {
        sendResponse(false, null, "Session expired. Please log in again.", 401);
    }

    // Extract Bearer token
    if (strpos($authHeader, 'Bearer ') === 0) {
        $token = substr($authHeader, 7);
        try {
            $payload = decodeJWT($token);
            if ($payload) return $payload;
        } catch (Exception $e) {
            sendResponse(false, null, "Unauthorized: " . $e->getMessage(), 401);
        }
    }

    sendResponse(false, null, "Unauthorized: Invalid token format", 401);
}

function decodeJWT($token) {
    if (!defined('JWT_SECRET')) {
        throw new Exception("JWT_SECRET not configured");
    }

    $parts = explode('.', $token);
    if (count($parts) != 3) {
        throw new Exception("Invalid token format");
    }

    $header = $parts[0];
    $payload = $parts[1];
    $signature = $parts[2];
    
    $expectedSignature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    
    if (!hash_equals($expectedSignature, $signature)) {
        throw new Exception("Invalid token signature");
    }

    $decodedPayload = json_decode(base64_decode($payload), true);
    if ($decodedPayload === null) {
        throw new Exception("Invalid token payload");
    }

    if (isset($decodedPayload['exp']) && $decodedPayload['exp'] < time()) {
        throw new Exception("Token expired");
    }

    return $decodedPayload;
}
?>
