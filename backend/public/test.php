<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
      $dsn = "mysql:host={$_ENV['MYSQL_HOST']};port={$_ENV['MYSQL_PORT']};dbname={$_ENV['MYSQL_DATABASE']};charset=utf8mb4";
      $pdo = new PDO($dsn, $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD']);
      echo "✅ DB Connection Successful";
} catch (PDOException $e) {
      echo "❌ DB Connection Failed: " . $e->getMessage();
}
