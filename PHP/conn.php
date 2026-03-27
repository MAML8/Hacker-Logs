<?php
    $host = 'localhost';
    $usuario = 'root';
    $senha = '';
    $banco = 'HackerLogs';
    $dsn = "mysql:host={$host};port=3306;dbname={$banco};charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, $usuario, $senha);
    }
    catch (PDOException $e) {
        die($e->getMessage());
    }
    header('Content-Type: application/json; charset=UTF-8');
?>