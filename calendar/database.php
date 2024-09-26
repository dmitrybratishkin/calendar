<?php
session_start();
$host = 'localhost'; // Или ваш хост
$db = 'calendar'; // Имя вашей базы данных
$user = 'root'; // Ваше имя пользователя базы данных
$pass = 'root'; // Ваш пароль базы данных

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Ошибка подключения: " . $e->getMessage();
    exit;
}
?>