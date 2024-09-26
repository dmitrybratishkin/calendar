<?php
include '../database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $date = $_POST['date'];
    $description = $_POST['description'];

    // Добавляем событие в базу данных
    $stmt = $pdo->prepare("INSERT INTO events (date, description) VALUES (?, ?)");
    $stmt->execute([$date, $description]);

    header('Location: index.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Добавить событие</title>
</head>
<body>
    <h1>Добавить событие</h1>
    <form method="POST">
        <label for="date">Дата:</label>
        <input type="date" name="date" required>
        <br>
        <label for="description">Описание:</label>
        <input type="text" name="description" required>
        <br>
        <button type="submit">Добавить</button>
    </form>
    <a href="index.php">Назад</a>
</body>
</html>
