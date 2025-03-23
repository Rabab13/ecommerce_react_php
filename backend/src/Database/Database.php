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
            $host = getenv('MYSQL_HOST');
            $port = getenv('MYSQL_PORT');
            $dbname = getenv('MYSQL_DATABASE');
            $username = getenv('MYSQL_USER');
            $password = getenv('MYSQL_PASSWORD');
            $url = getenv('MYSQL_URL');

            // // Debugging: Print variables
            // echo 'MYSQL_HOST: ' . $host . '<br>';
            // echo 'MYSQL_USER: ' . $username . '<br>';
            // echo 'MYSQL_PASSWORD: ' . ($password ? 'Set' : 'Empty') . '<br>';
            // echo 'MYSQL_DATABASE: ' . $dbname . '<br>';
            // echo 'MYSQL_URL: ' . $url . '<br>';

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
                  ]);
                  echo 'Database connected successfully!';
            } catch (PDOException $e) {
                  echo 'Database connection failed: ' . $e->getMessage();
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
