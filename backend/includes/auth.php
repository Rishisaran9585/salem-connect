<?php
// backend/includes/auth.php

function authenticate() {
    // Try to get Authorization header from multiple sources
    $authHeader = '';
    
    // Method 1: Check $_SERVER['HTTP_AUTHORIZATION'] (most reliable)
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    // Method 2: Check $_SERVER['AUTHORIZATION']
    elseif (!empty($_SERVER['AUTHORIZATION'])) {
        $authHeader = $_SERVER['AUTHORIZATION'];
    }
    // Method 3: Use getallheaders() as fallback
    else {
        $headers = getallheaders();
        // Check for Authorization key (case-insensitive)
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $authHeader = $value;
                break;
            }
        }
    }

    if (empty($authHeader)) {
        sendResponse(false, null, "Unauthorized: Missing Authorization header", 401);
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
    // Require JWT_SECRET to be defined
    if (!defined('JWT_SECRET')) {
        throw new Exception("JWT_SECRET not configured");
    }

    $parts = explode('.', $token);
    if (count($parts) != 3) {
        throw new Exception("Invalid token format");
    }

    // Verify signature
    $header = $parts[0];
    $payload = $parts[1];
    $signature = $parts[2];
    
    // Calculate expected signature
    $expectedSignature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    
    // Compare signatures (constant-time comparison for security)
    if (!hash_equals($expectedSignature, $signature)) {
        throw new Exception("Invalid token signature");
    }

    // Decode and validate payload
    $decodedPayload = json_decode(base64_decode($payload), true);
    if ($decodedPayload === null) {
        throw new Exception("Invalid token payload");
    }

    // Check expiration
    if (isset($decodedPayload['exp']) && $decodedPayload['exp'] < time()) {
        throw new Exception("Token expired");
    }

    return $decodedPayload;
}
?>
