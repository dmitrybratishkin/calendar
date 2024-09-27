<?php
session_start();
include '../database.php';

// Получаем события из базы данных
$stmt = $pdo->query("SELECT * FROM events");
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Проверка, авторизован ли пользователь
$isLoggedIn = isset($_SESSION['user_id']);
$username = $isLoggedIn ? $_SESSION['username'] : null; // Получаем имя пользователя
$role = $isLoggedIn ? $_SESSION['role'] : null; // или любое другое значение роли

// Получение закрашенных дат из базы данных
$stmt = $pdo->query("SELECT * FROM calendar_colors");
$coloredDates = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $coloredDates[$row['date']] = $row['color'];
}
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
            <!-- Выпадающее меню для авторизованных пользователей -->
            <div class="dropdown">
                <span>Добро пожаловать, <?php echo htmlspecialchars($username); ?>!</span>
                <button><?php echo htmlspecialchars($username); ?></button>
                <div class="dropdown-content">
                    <?php if ($role === 'admin'): ?>
                        <a href="admin.php">Админка</a>
                    <?php endif; ?>
                    <a href="logout.php">Выйти</a>
                </div>
            </div>
        <?php else: ?>
            <!-- Кнопка Вход / Регистрация для неавторизованных пользователей -->
            <button id="openModal">Вход / Регистрация</button>
        <?php endif; ?>
    </div>
    </div>


    <div id="modal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <div id="authForm">
            <h2>Вход</h2>
            <form id="loginForm" method="POST">
                <label for="loginUsername">Имя пользователя:</label>
                <input type="text" id="loginUsername" name="username" required>
                <label for="loginPassword">Пароль:</label>
                <input type="password" id="loginPassword" name="password" required>
                <button type="submit">Войти</button>
                <div id="error-message" style="color: red;"></div> <!-- Элемент для отображения ошибок -->
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

    <!-- Модальное окно для выбора цвета -->
    <div id="colorModal" class="modal" style="display:none;">
    <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <h2>Выбор цвета для даты: <span id="selectedDate"></span></h2>
        <label for="colorPicker">Выберите цвет:</label>
        <input type="color" id="colorPicker" value="#ff0000">
        <button id="applyColor">Применить</button>
        <button id="removeColor">Удалить закрашивание</button> <!-- Кнопка для удаления цвета -->
        <button id="closeModal">Закрыть</button>
    </div>
</div>

<script>
    const isLoggedIn = <?php echo json_encode($isLoggedIn); ?>;
    const userRole = <?php echo json_encode($role); ?>;
</script>

    <script src="./main.js"></script>
</body>
</html>
