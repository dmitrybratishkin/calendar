<?php
include '../database.php';

// Получаем события из базы данных
$stmt = $pdo->query("SELECT * FROM events");
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="../public/style.css">
</head>
<body>
    <h1>Админка календаря</h1>
    <h2>События</h2>
    <table>
        <tr>
            <th>Дата</th>
            <th>Описание</th>
            <th>Действия</th>
        </tr>
        <?php foreach ($events as $event): ?>
        <tr>
            <td><?php echo $event['date']; ?></td>
            <td><?php echo $event['description']; ?></td>
            <td>
                <a href="delete_event.php?id=<?php echo $event['id']; ?>">Удалить</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
    <a href="add_event.php">Добавить событие</a>
</body>
</html>
