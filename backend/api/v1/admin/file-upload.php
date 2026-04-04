<?php
// backend/api/v1/admin/file-upload.php
require_once __DIR__ . '/../../../includes/db.php';
require_once __DIR__ . '/../../../includes/response.php';
require_once __DIR__ . '/../../../includes/auth.php';

handleOptions();
authenticate(); // JWT protection

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Handle file uploads
    
    if (!isset($_FILES['file'])) {
        sendResponse(false, null, "No file uploaded", 400);
    }
    
    $file = $_FILES['file'];
    $uploadType = $_POST['type'] ?? 'general';
    
    // Validate file
    $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowedMimes)) {
        sendResponse(false, null, "Invalid file type. Only images allowed.", 400);
    }
    
    if ($file['size'] > 5 * 1024 * 1024) { // 5MB limit
        sendResponse(false, null, "File size exceeds 5MB limit", 400);
    }
    
    // Create uploads directory if it doesn't exist
    $uploadsDir = __DIR__ . '/../../../uploads/';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
    }
    
    // Create type-specific subdirectory
    $typeDir = $uploadsDir . $uploadType . '/';
    if (!is_dir($typeDir)) {
        mkdir($typeDir, 0755, true);
    }
    
    // Generate unique filename
    $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $fileName = uniqid('img_') . '.' . $fileExt;
    $filePath = $typeDir . $fileName;
    $relativeUrl = 'uploads/' . $uploadType . '/' . $fileName;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        // Return URL that can be used from the frontend (relative to web root)
        // The uploads folder is in /backend/uploads/, so prepend /backend/
        sendResponse(true, [
            'filename' => $fileName,
            'url' => '/backend/' . $relativeUrl,
            'relative_path' => $relativeUrl
        ], "File uploaded successfully");
    } else {
        sendResponse(false, null, "Failed to save file", 500);
    }
} else if ($method === 'DELETE') {
    // Delete uploaded file
    $filePath = $_GET['file'] ?? null;
    
    if (!$filePath) {
        sendResponse(false, null, "File path is required", 400);
    }
    
    // Security: only allow deleting files from uploads directory
    $fullPath = __DIR__ . '/../../../' . ltrim($filePath, '/');
    $uploadsDir = __DIR__ . '/../../../uploads/';
    
    if (strpos(realpath($fullPath), realpath($uploadsDir)) !== 0) {
        sendResponse(false, null, "Invalid file path", 400);
    }
    
    if (file_exists($fullPath)) {
        unlink($fullPath);
        sendResponse(true, null, "File deleted successfully");
    } else {
        sendResponse(false, null, "File not found", 404);
    }
}
?>
