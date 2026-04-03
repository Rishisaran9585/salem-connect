<?php
// backend/includes/response.php

function sendResponse($success, $data, $message = "", $code = 200) {
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
    http_response_code($code);
    
    $response = [
        "success" => $success,
        "message" => $message,
        "data" => $data
    ];
    
    echo json_encode($response);
    exit;
}

function handleOptions() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        http_response_code(200);
        exit;
    }
}
?>
