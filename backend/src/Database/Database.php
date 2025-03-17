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
            $host = getenv('DB_HOST');
            $dbname = getenv('DB_NAME');
            $username = getenv('DB_USER');
            $password = getenv('DB_PASSWORD');
            error_log("DB_HOST: $host");
            error_log("DB_NAME: $dbname");
            error_log("DB_USER: $username");
            error_log("DB_PASSWORD: $password");

            if (!$host || !$dbname || !$username || !$password) {
                  throw new \RuntimeException("Missing database configuration in environment variables.");
            }

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
