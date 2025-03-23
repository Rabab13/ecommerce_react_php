<?php

require_once __DIR__ . '/../vendor/autoload.php';

// Debug: Check if .env file exists
$envFilePath = __DIR__ . '/../.env';
if (!file_exists($envFilePath)) {
      die('.env file not found at: ' . $envFilePath);
}

// Load environment variables from .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Debug: Print environment variables
echo 'MYSQL_HOST: ' . getenv('MYSQL_HOST') . '<br>';
echo 'MYSQL_PORT: ' . getenv('MYSQL_PORT') . '<br>';
echo 'MYSQL_DATABASE: ' . getenv('MYSQL_DATABASE') . '<br>';
echo 'MYSQL_USER: ' . getenv('MYSQL_USER') . '<br>';
echo 'MYSQL_PASSWORD: ' . (getenv('MYSQL_PASSWORD') ? 'Set' : 'Not Set') . '<br>';

// Require the Database class
require_once __DIR__ . '/../src/Database/Database.php';

use App\Database\Database;

try {
      // Get the database instance
      $db = Database::getInstance();

      // Get the PDO connection
      $connection = $db->getConnection();

      // Test the connection by running a simple query
      $stmt = $connection->query('SELECT 1');
      $result = $stmt->fetch();

      // Output success message and query result
      echo "Connected successfully!<br>";
      echo "Test query result: ";
      print_r($result);
} catch (\RuntimeException $e) {
      // Handle connection errors
      echo "Connection failed: " . $e->getMessage();
} catch (\PDOException $e) {
      // Handle PDO-specific errors
      echo "Database error: " . $e->getMessage();
}
