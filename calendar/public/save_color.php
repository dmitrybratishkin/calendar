<?php
session_start();
include '../database.php';

// Проверка, является ли пользователь администратором
if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin') {
    $data = json_decode(file_get_contents('php://input'), true);
    $date = $data['date'];
    $color = $data['color'];

    // Сохранение цвета в базе данных
    $stmt = $pdo->prepare("INSERT INTO calendar_colors (date, color) VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE color = ?");
    $stmt->execute([$date, $color, $color]);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Недостаточно прав']);
}
?>