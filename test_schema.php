<?php
require_once "backend/includes/db.php";
$stmt = $pdo->query("DESCRIBE businesses");
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach($res as $r) {
    echo $r['Field'] . ' | ';
}
?>
