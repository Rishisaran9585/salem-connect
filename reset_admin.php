<?php
require_once __DIR__ . '/backend/includes/db.php';
$email = 'admin@salemdir.com';
$password = 'admin123';
$username = 'admin';
$hash = password_hash($password, PASSWORD_BCRYPT);

try {
    // Check if the user exists
    $stmt = $pdo->prepare("SELECT id FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        $stmt = $pdo->prepare("UPDATE admins SET password = ? WHERE email = ?");
        $stmt->execute([$hash, $email]);
        echo "Admin account already exists. Password has been reset to: admin123";
    } else {
        $stmt = $pdo->prepare("INSERT INTO admins (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hash]);
        echo "Successfully created a NEW admin account. Email: admin@salemdir.com | Password: admin123";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
