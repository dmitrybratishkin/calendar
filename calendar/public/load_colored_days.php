<?php
include '../database.php';

$stmt = $pdo->prepare("SELECT date, color FROM calendar_colors");
$stmt->execute();
$coloredDays = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($coloredDays);
?>