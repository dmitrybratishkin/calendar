<?php
session_start();
include '../database.php';

// Проверка, зарегистрирован ли пользователь
if (isset($_SESSION['user_id'])) {
    header('Location: ../public/index.php'); // Изменено на правильный путь
    exit();
}

// Обработка формы входа
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Проверка пользователя в базе данных
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Проверка пароля
    if ($user && password_verify($password, $user['password'])) {
        // Устанавливаем сессию для идентификатора пользователя и роли
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role']; // Сохранение роли пользователя в сессию

        $response = ['success' => true]; // Успешный вход
    } else {
        $response = ['success' => false, 'message' => 'Неверное имя пользователя или пароль.']; // Ошибка
    }

    // Возвращаем JSON-ответ
    echo json_encode($response);
    exit();
}
?>


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход</title>
    <link rel="stylesheet" href="../public/style.css">
</head>
<body>
    <div class="container">
        <h2>Вход</h2>
        <?php if (isset($error)): ?>
            <p style="color:red;"><?php echo $error; ?></p>
        <?php endif; ?>
        <form method="POST">
            <label for="username">Имя пользователя:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Войти</button>
        </form>
        <p>Нет аккаунта? <a href="register.php">Зарегистрироваться</a></p>
    </div>
</body>
</html>
