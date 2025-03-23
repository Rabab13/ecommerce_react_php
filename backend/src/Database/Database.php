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
            // Use MYSQL_* environment variables
            $host = getenv('MYSQL_HOST_OVERRIDE') ?: getenv('MYSQL_HOST');
            $port = getenv('MYSQL_PORT');
            $dbname = getenv('MYSQL_DATABASE');
            $username = getenv('MYSQL_USER');
            $password = getenv('MYSQL_PASSWORD');
            $url = getenv('MYSQL_URL');

            // Debug logging to verify environment variables
            error_log("[DEBUG] MYSQL_HOST: " . getenv('MYSQL_HOST'));
            error_log("[DEBUG] MYSQL_PORT: " . getenv('MYSQL_PORT'));
            error_log("[DEBUG] MYSQL_DATABASE: " . getenv('MYSQL_DATABASE'));
            error_log("[DEBUG] MYSQL_USER: " . getenv('MYSQL_USER'));
            error_log("[DEBUG] MYSQL_PASSWORD: " . (getenv('MYSQL_PASSWORD') ? "Set" : "Empty"));

            // Validate required environment variables
            if (!$host || !$port || !$dbname || !$username || !$password) {
                  error_log("[ENV VAR DEBUG] Host: $host | Port: $port | MYSQL: $dbname | User: $username | Password: " . ($password ? "Set" : "Empty"));
                  throw new \RuntimeException("Missing database configuration in environment variables.");
            }

            // Construct the DSN (Data Source Name)
            $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
            error_log("[DEBUG] DSN: $dsn");

            try {
                  // Create a new PDO instance for the database connection
                  $this->connection = new PDO($dsn, $username, $password, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Enable exceptions for errors
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Set default fetch mode to associative array
                        PDO::ATTR_TIMEOUT => 10 // Set connection timeout to 10 seconds
                  ]);
                  error_log("[Database Connected] Successfully connected to DB.");
            } catch (PDOException $e) {
                  // Log the error and throw an exception if the connection fails
                  error_log("[Database DSN] $dsn");
                  error_log("[PDO ERROR] " . $e->getMessage());
                  throw new \RuntimeException("Database connection failed: " . $e->getMessage());
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
