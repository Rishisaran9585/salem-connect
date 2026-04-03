<?php
// backend/config/config.php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'salem_directory');

define('JWT_SECRET', 'salem_secret_key_2024_!@#');
define('JWT_EXPIRY', 86400); // 24 hours

define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('BASE_URL', 'http://localhost/salem-connect/backend/api/v1/');

// Razorpay Keys (Placeholder)
define('RAZORPAY_KEY_ID', 'rzp_test_XXXXXXXXXXXXXX');
define('RAZORPAY_KEY_SECRET', 'XXXXXXXXXXXXXX');
?>
