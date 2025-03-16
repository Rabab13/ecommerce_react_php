<?php
// src/Models/Attribute.php

namespace App\Models;

use PDO;
use PDOException;

class Attribute extends BaseModel implements ModelInterface
{
    protected string $table = 'attributes';

    public function findAll(): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table}");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->logError("Error fetching all attributes: " . $e->getMessage()); // Use logError method
            return null;
        }
    }

    public function findById($id): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = :id");
            $stmt->execute(['id' => $id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->logError("Error fetching attribute by ID: " . $e->getMessage()); // Use logError method
            return null;
        }
    }
    public function findByName(string $name): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE name = :name");
            $stmt->execute(['name' => $name]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->logError("Error fetching attribute by name: " . $e->getMessage()); // Use logError method
            return null;
        }
    }
}
