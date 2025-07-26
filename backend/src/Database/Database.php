<?php

namespace App\Database;

use PDO;
use PDOException;

class Database
{
      private static $instance = null;
      private $connection;

      private function __construct()
      {
            // Fetch environment variables
            $host = getenv('DB_HOST');
            $port = getenv('DB_PORT');
            $dbname = getenv('DB_DATABASE');
            $username = getenv('DB_USER');
            $password = getenv('DB_PASSWORD');

            // Validate required environment variables
            if (!$host || !$port || !$dbname || !$username || !$password) {
                  throw new \RuntimeException("Missing database configuration in environment variables.");
            }

            // Create the DSN
            $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

            // Attempt to connect to the database
            try {
                  $this->connection = new PDO($dsn, $username, $password, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                  ]);
                  // Log success message to the server log
                  error_log('Database connected successfully!');
            } catch (PDOException $e) {
                  throw new \RuntimeException('Database connection failed: ' . $e->getMessage());
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
