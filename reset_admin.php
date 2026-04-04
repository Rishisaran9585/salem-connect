<?php
require_once __DIR__ . '/backend/includes/db.php';
$email = 'admin@salemdir.com';
$password = 'admin123';
$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("UPDATE admins SET password = ? WHERE email = ?");
$stmt->execute([$hash, $email]);
echo "Password updated for $email. Hash: $hash\n";
?>
