<?php
// Подключение к базе данных
include('../database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля.']);
        exit;
    }

    // Проверка на существование пользователя
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $userExists = $stmt->fetchColumn();

    if ($userExists) {
        echo json_encode(['success' => false, 'message' => 'Пользователь с таким именем уже существует.']);
        exit;
    }

    // Хеширование пароля
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Вставка данных в БД
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt->execute([$username, $hashedPassword])) {
        echo json_encode(['success' => true, 'message' => 'Регистрация успешна!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при регистрации.']);
    }
    exit;
}
?>







<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Регистрация</title>
    <link rel="stylesheet" href="../public/style.css">
</head>
<body>
    <div class="container">
        <h2>Регистрация</h2>
        <?php if (isset($error)): ?>
            <p style="color:red;"><?php echo $error; ?></p>
        <?php endif; ?>
        <p>Уже есть аккаунт? <a href="../login.php">Войти</a></p>
    </div>
</body>
</html>
