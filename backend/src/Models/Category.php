<?php

namespace App\Models;

use PDO;
use PDOException;

class Category extends BaseModel implements ModelInterface
{
    protected string $table = 'categories';

    public function findAll(): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table}");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            error_log("Error fetching all categories: " . $e->getMessage());
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
            $this->logError("Error fetching record by ID from {$this->table}: " . $e->getMessage());
            return null;
        }
    }
    public function findByName(string $name): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE name = :name");
            $stmt->execute(['name' => $name]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Error fetching category by name: " . $e->getMessage());
            return null;
        }
    }
}
