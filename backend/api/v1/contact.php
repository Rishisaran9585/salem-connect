<?php
// backend/api/v1/contact.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../includes/db.php';

function sendResponse($success, $data = null, $message = '', $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => $success, 'data' => $data, 'message' => $message]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, null, 'Method not allowed', 405);
}

$input = json_decode(file_get_contents('php://input'), true);

$your_name    = trim($input['your_name'] ?? '');
$is_owner     = (trim($input['is_owner'] ?? 'No') === 'Yes') ? 1 : 0;
$business_name = trim($input['business_name'] ?? '');
$mobile       = trim($input['mobile'] ?? '');
$email        = trim($input['email'] ?? '');
$message      = trim($input['message'] ?? '');
$reason       = trim($input['reason'] ?? '');

if (empty($your_name) || empty($mobile)) {
    sendResponse(false, null, 'Name and mobile are required.', 400);
}

// --- 1. Save to database ---
try {
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, is_owner, business_name, mobile, email, message, reason, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'new', NOW())
    ");
    $stmt->execute([$your_name, $is_owner, $business_name, $mobile, $email, $message, $reason]);
} catch (PDOException $e) {
    // DB save failed - still try to send email
    error_log("Contact DB error: " . $e->getMessage());
}

// --- 2. Send email to salembusiness37@gmail.com ---
$to = 'salembusiness37@gmail.com';
$subject = "New Contact Inquiry - Salem Business";

$body = "You have received a new contact form submission:\n\n";
$body .= "Name        : " . $your_name . "\n";
$body .= "Is Owner    : " . $is_owner . "\n";
$body .= "Business    : " . ($business_name ?: 'N/A') . "\n";
$body .= "Mobile      : " . $mobile . "\n";
$body .= "Email       : " . ($email ?: 'N/A') . "\n";
$body .= "Reason      : " . ($reason ?: 'N/A') . "\n";
$body .= "Message     : " . ($message ?: 'N/A') . "\n";
$body .= "\n---\nSent from Salem Business Contact Form\n";

$headers  = "From: no-reply@salembusiness.in\r\n";
$headers .= "Reply-To: " . ($email ?: 'no-reply@salembusiness.in') . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

sendResponse(true, null, 'Your message has been sent successfully!');
?>
