<?php
session_start();
include '../database.php';

// Получаем события из базы данных
$stmt = $pdo->query("SELECT * FROM events");
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Проверка, авторизован ли пользователь
$isLoggedIn = isset($_SESSION['user_id']);
$username = $isLoggedIn ? $_SESSION['username'] : null; // Получаем имя пользователя
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Губехи :)</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <div class="header">
        <h1 class="lips">Хочу увеличить губы, день <span id="days-counter"></span></h1>
        <div id="user-info">
            <?php if ($isLoggedIn): ?>
                <span>Добро пожаловать, <?php echo htmlspecialchars($username); ?>!</span>
                <button id="logoutButton">Выйти</button>
            <?php else: ?>
                <button id="openModal">Вход / Регистрация</button>
            <?php endif; ?>
        </div>
    </div>


    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeModal">&times;</span>
            <div id="authForm">
                <h2>Вход</h2>
                <form id="loginForm" method="POST" action="../admin/login.php">
                    <label for="loginUsername">Имя пользователя:</label>
                    <input type="text" id="loginUsername" name="username" required>
                    <label for="loginPassword">Пароль:</label>
                    <input type="password" id="loginPassword" name="password" required>
                    <button type="submit">Войти</button>
                </form>
                <p>Нет аккаунта? <button id="openRegister">Зарегистрироваться</button></p>
            </div>

            <div id="registrationForm" style="display: none;">
                <h2>Регистрация</h2>
                <form id="registrationFormElement">
                    <label for="regUsername">Имя пользователя:</label>
                    <input type="text" id="regUsername" name="username" required>

                    <label for="regPassword">Пароль:</label>
                    <input type="password" id="regPassword" name="password" required>

                    <button type="submit">Зарегистрироваться</button>
                </form>
                <button id="openLogin">Вернуться к авторизации</button>
            </div>
        </div>
    </div>

    <div id="calendar"></div>

    <script src="./main.js"></script>
</body>
</html>
