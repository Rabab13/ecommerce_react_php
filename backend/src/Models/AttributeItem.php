<?php
// src/Models/AttributeItem.php

namespace App\Models;

use PDO;
use PDOException;

class AttributeItem extends BaseModel implements ModelInterface
{
    protected string $table = 'attribute_items';

    public function __construct(PDO $db)
    {
        parent::__construct($db);
    }

    public function insert(array $data): bool
    {
        try {
            $query = "INSERT INTO {$this->table} (id, display_value, value, attribute_set_id) 
                      VALUES (:id, :display_value, :value, :attribute_set_id)";
            $stmt = $this->db->prepare($query);
            return $stmt->execute($data);
        } catch (PDOException $e) {
            error_log("Error inserting attribute item: " . $e->getMessage());
            return false;
        }
    }

    public function findAll(): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table}";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            error_log("Error fetching all attribute items: " . $e->getMessage());
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
            error_log("Error fetching attribute item by ID: " . $e->getMessage());
            return null;
        }
    }

    public function getByAttributeId(int $attributeSetId): array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE attribute_set_id = :attribute_set_id";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['attribute_set_id' => $attributeSetId]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            error_log("Error fetching attribute items by attribute set ID: " . $e->getMessage());
            return [];
        }
    }
}
