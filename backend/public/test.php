<?php
$host = 'mysql.railway.internal';
$port = 3306;
$dbname = 'railway';
$username = 'root';
$password = 'SYoByCJmatFpokpYkWyVWuGDqaQCVQst';

try {
      $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
      $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 10,
      ]);
      echo "Connected successfully!";
} catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
}
