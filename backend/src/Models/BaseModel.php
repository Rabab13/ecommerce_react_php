<?php

namespace App\Models;

use PDO;
use PDOException;

abstract class BaseModel implements ModelInterface
{
    protected PDO $db;
    protected string $table;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    protected function getTableName(): string
    {
        return $this->table;
    }


    public function findAll(): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table}";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            $this->logError("Error fetching all records from {$this->table}: " . $e->getMessage());
            return null;
        }
    }

    public function findById(int|string $id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['id' => $id]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Error fetching record by ID from {$this->table}: " . $e->getMessage());
            return null;
        }
    }

    public function update(int $id, array $data): bool
    {
        try {
            $set = [];
            foreach ($data as $key => $value) {
                $set[] = "$key = :$key";
            }
            $set = implode(', ', $set);
            $query = "UPDATE {$this->table} SET $set WHERE id = :id";
            $data['id'] = $id;
            $stmt = $this->db->prepare($query);
            return $stmt->execute($data);
        } catch (PDOException $e) {
            $this->logError("Error updating record in {$this->table}: " . $e->getMessage());
            return false;
        }
    }


    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (PDOException $e) {
            $this->logError("Error deleting record from {$this->table}: " . $e->getMessage());
            return false;
        }
    }
    public function insert(array $data): mixed
    {
        try {
            $columns = implode(', ', array_keys($data));
            $values = ':' . implode(', :', array_keys($data));
            $query = "INSERT INTO {$this->getTableName()} ($columns) VALUES ($values)";
            $stmt = $this->db->prepare($query);

            error_log("Executing query: " . $query);
            error_log("Data: " . json_encode($data));

            if ($stmt->execute($data)) {
                return $this->db->lastInsertId();
            } else {
                $errorInfo = $stmt->errorInfo();
                $this->logError("Failed to execute query: " . json_encode($errorInfo));
                return false;
            }
        } catch (PDOException $e) {
            $this->logError("Error inserting data into {$this->getTableName()}: " . $e->getMessage());
            return false;
        }
    }

    protected function logError(string $message): void
    {
        error_log($message);
    }
}
