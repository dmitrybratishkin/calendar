<?php
include '../database.php';

$data = json_decode(file_get_contents('php://input'), true);
$date = $data['date'];

if ($date) {
    $stmt = $pdo->prepare("DELETE FROM calendar_colors WHERE date = ?");
    if ($stmt->execute([$date])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Не удалось удалить закрашивание']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Некорректная дата']);
}
?>
