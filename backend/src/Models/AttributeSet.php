<?php
// src/Models/AttributeSet.php

namespace App\Models;

use PDO;
use PDOException;

class AttributeSet extends BaseModel implements ModelInterface
{
      protected string $table = 'attribute_sets';


      public function insert(array $data): bool
      {
            try {
                  $query = "INSERT INTO {$this->table} (name, product_id) VALUES (:name, :product_id)";
                  $stmt = $this->db->prepare($query);
                  return $stmt->execute($data);
            } catch (PDOException $e) {
                  error_log("Error inserting attribute set: " . $e->getMessage());
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
                  error_log("Error fetching attribute sets: " . $e->getMessage());
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
                  error_log("Error fetching attribute set by ID: " . $e->getMessage());
                  return null;
            }
      }


      public function getByProductId(int $productId): array
      {
            try {
                  $query = "SELECT * FROM {$this->table} WHERE product_id = :product_id";
                  $stmt = $this->db->prepare($query);
                  $stmt->execute(['product_id' => $productId]);
                  return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                  error_log("Error fetching attribute sets by product ID: " . $e->getMessage());
                  return [];
            }
      }
      public function getByProductIdAndName(int $productId, string $name): ?array
      {
            try {
                  $query = "SELECT * FROM {$this->table} WHERE product_id = :product_id AND name = :name";
                  $stmt = $this->db->prepare($query);
                  $stmt->execute(['product_id' => $productId, 'name' => $name]);
                  return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
            } catch (PDOException $e) {
                  $this->logError("Error fetching attribute set by product ID and name: " . $e->getMessage());
                  return null;
            }
      }
}
