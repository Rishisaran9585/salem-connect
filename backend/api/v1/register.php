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
    
    if (empty($data['business_name']) || empty($data['category_name']) || empty($data['mobile'])) {
        sendResponse(false, null, "Missing required fields", 400);
    }
    
    // Lookup category_id by name
    $catStmt = $pdo->prepare("SELECT id FROM categories WHERE name = ? LIMIT 1");
    $catStmt->execute([$data['category_name']]);
    $category = $catStmt->fetch();
    $category_id = $category ? $category['id'] : null;

    $slug = generateSlug($data['business_name']) . '-' . rand(100, 999);
    
    $stmt = $pdo->prepare("INSERT INTO businesses (
        slug, business_name, owner_name, category_id, 
        description, address, area, city, state, pincode, 
        mobile, mobile_alt, email, website, 
        status, is_verified, your_name, your_email, 
        payment_status, payment_amount, message
    ) VALUES (
        ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, 
        'pending', 0, ?, ?, 
        'paid', 150.00, ?
    )");
    
    $message = "Validity: 1 Year (System-wide default)";

    $result = $stmt->execute([
        $slug, $data['business_name'], $data['owner_name'] ?? null, $category_id,
        $data['description'] ?? null, $data['address'] ?? null, $data['area'] ?? null, $data['city'] ?? 'Salem', $data['state'] ?? 'Tamil Nadu', $data['pincode'] ?? null,
        $data['mobile'], $data['mobile_alt'] ?? null, $data['email'] ?? null, $data['website'] ?? null,
        $data['your_name'] ?? null, $data['your_email'] ?? null, $message
    ]);
    
    if ($result) {
        $id = $pdo->lastInsertId();
        sendResponse(true, ["id" => $id, "slug" => $slug], "Registration submitted successfully");
    } else {
        error_log(print_r($stmt->errorInfo(), true));
        sendResponse(false, null, "Internal server error during insertion", 500);
    }
}
?>
