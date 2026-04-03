<?php
// backend/api/v1/register.php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

function generateSlug($name) {
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
}

handleOptions();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['business_name']) || empty($data['category_id']) || empty($data['mobile'])) {
        sendResponse(false, null, "Missing required fields", 400);
    }
    
    $slug = generateSlug($data['business_name']) . '-' . rand(100, 999);
    
    $stmt = $pdo->prepare("INSERT INTO businesses (
        slug, business_name, owner_name, category_id, subcategory_id, 
        description, address, area, city, state, pincode, 
        mobile, mobile_alt, email, website, 
        status, verified, your_name, your_email, message, 
        payment_status, payment_amount
    ) VALUES (
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, 
        'pending', FALSE, ?, ?, ?, 
        'pending', 150.00
    )");
    
    $result = $stmt->execute([
        $slug, $data['business_name'], $data['owner_name'] ?? null, $data['category_id'], $data['subcategory_id'] ?? null,
        $data['description'] ?? null, $data['address'] ?? null, $data['area'] ?? null, $data['city'] ?? 'Salem', $data['state'] ?? 'Tamil Nadu', $data['pincode'] ?? null,
        $data['mobile'], $data['mobile_alt'] ?? null, $data['email'] ?? null, $data['website'] ?? null,
        $data['your_name'] ?? null, $data['your_email'] ?? null, $data['message'] ?? null
    ]);
    
    if ($result) {
        $id = $pdo->lastInsertId();
        sendResponse(true, ["id" => $id, "slug" => $slug], "Registration submitted successfully");
    } else {
        sendResponse(false, null, "Internal server error", 500);
    }
}
?>
