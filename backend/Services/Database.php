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
        $host = getenv('MYSQL_HOST');
        $port = getenv('MYSQL_PORT');
        $dbname = getenv('MYSQL_DATABASE');
        $username = getenv('MYSQL_USER');
        $password = getenv('MYSQL_PASSWORD');


        if (!$host || !$port || !$dbname || !$username || !$password) {
            error_log("[ENV VAR DEBUG] Host: $host | Port: $port | DB: $dbname | User: $username | Password: " . ($password ? "Set" : "Empty"));
            throw new \RuntimeException("Missing database configuration in environment variables.");
        }

        if (!$dbname || !$username || !$password) {
            error_log("[Database Error] Missing critical ENV vars.");
            throw new \RuntimeException("Missing database configuration.");
        }

        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
        error_log("[DEBUG] ENV - Host: $host | Port: $port | DB: $dbname | User: $username | Pass: " . ($password ? "Set" : "Empty"));

        try {
            $this->connection = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 10
            ]);
            error_log("[Database Connected] Successfully connected to DB.");
        } catch (PDOException $e) {
            error_log("[Database DSN] mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4");
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
