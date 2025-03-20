<?php
// src/Database/Database.php
namespace App\Database;

use PDO;
use PDOException;

class Database
{
      private static $instance = null;
      private $connection;

      private function __construct()
      {
            // Use $_ENV to access environment variables
            $host = $_ENV['DB_HOST'] ?? null;
            $dbname = $_ENV['DB_NAME'] ?? null;
            $username = $_ENV['DB_USER'] ?? null;
            $password = $_ENV['DB_PASSWORD'] ?? null;

            // Log environment variables for debugging
            error_log("DB_HOST: $host");
            error_log("DB_NAME: $dbname");
            error_log("DB_USER: $username");
            error_log("DB_PASSWORD: $password");

            // Validate environment variables
            if (!$host || !$dbname || !$username || !$password) {
                  throw new \RuntimeException("Missing database configuration in environment variables.");
            }

            // Create PDO connection
            try {
                  $this->connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
                  $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                  error_log("Database connection failed: " . $e->getMessage());
                  throw new \RuntimeException("Database connection failed.");
            }
      }

      public static function getInstance(): self
      {
            if (self::$instance === null) {
                  self::$instance = new self();
            }
            return self::$instance;
      }

      public function getConnection(): PDO
      {
            return $this->connection;
      }
}
