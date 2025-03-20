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
        $host = getenv('DB_HOST') ?: 'localhost';
        $port = getenv('DB_PORT') ?: '3306';
        $dbname = getenv('DB_NAME');
        $username = getenv('DB_USER');
        $password = getenv('DB_PASSWORD');

        // Log to help diagnose in Railway Logs
        error_log("[Database Init] Host: $host | Port: $port | DB: $dbname | User: $username");

        if (!$dbname || !$username || !$password) {
            error_log("[Database Error] Missing critical ENV vars.");
            throw new \RuntimeException("Missing database configuration.");
        }

        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

        try {
            $this->connection = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            error_log("[Database Connected] Successfully connected to DB.");
        } catch (PDOException $e) {
            error_log("[Database Error] Connection failed: " . $e->getMessage());
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
