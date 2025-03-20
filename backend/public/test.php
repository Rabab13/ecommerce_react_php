<?php

require_once __DIR__ . '/../vendor/autoload.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Debug: Print environment variables
echo "DB_HOST: " . ($_ENV['DB_HOST'] ?? 'Not set') . "\n";
echo "DB_PORT: " . ($_ENV['DB_PORT'] ?? 'Not set') . "\n";
echo "DB_USER: " . ($_ENV['DB_USER'] ?? 'Not set') . "\n";
echo "DB_PASSWORD: " . ($_ENV['DB_PASSWORD'] ?? 'Not set') . "\n";
echo "DB_NAME: " . ($_ENV['DB_NAME'] ?? 'Not set') . "\n";

use App\Database\Database;

try {
      // Test database connection
      $db = Database::getInstance();
      $connection = $db->getConnection();
      echo "Database connection successful!";
} catch (\RuntimeException $e) {
      echo "Database connection failed: " . $e->getMessage();
} catch (\Exception $e) {
      echo "An unexpected error occurred: " . $e->getMessage();
}
