<?php
session_start();
session_unset(); // Удаляет все переменные сессии
session_destroy(); // Уничтожает сессию
header('Location: ../public/index.php'); // Перенаправляем на главную страницу
exit();
?>
