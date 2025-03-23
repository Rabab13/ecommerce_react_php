<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Load environment variables from .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

require_once __DIR__ . '/../src/Database/Database.php';

try {
      $db = App\Database\Database::getInstance();
      $connection = $db->getConnection();
      echo "Connected successfully!";
} catch (\RuntimeException $e) {
      echo "Connection failed: " . $e->getMessage();
}
