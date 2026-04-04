<?php
require_once __DIR__ . '/backend/includes/db.php';
$stmt = $pdo->query("SELECT id, username, email, LEFT(password,30) as pass_preview FROM admins");
$rows = $stmt->fetchAll();
print_r($rows);

// Test password verify
if (!empty($rows)) {
    $test = password_verify('admin123', $rows[0]['password'] ?? '');
    echo "\npassword_verify('admin123'): " . ($test ? 'TRUE - OK!' : 'FALSE - MISMATCH') . "\n";
}
?>
