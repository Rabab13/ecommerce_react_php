<?php
// src/Models/Price.php

namespace App\Models;

use PDO;
use PDOException;

class Price extends BaseModel implements ModelInterface
{
      protected string $table = 'prices';



      public function findAll(): ?array
      {
            try {
                  $query = "SELECT * FROM {$this->table}";
                  $stmt = $this->db->prepare($query);
                  $stmt->execute();
                  return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
            } catch (PDOException $e) {
                  error_log("Error fetching all prices: " . $e->getMessage());
                  return null;
            }
      }

      // Fetch a single price by ID
      public function findById(int|string $id): ?array
      {
            try {
                  $query = "SELECT * FROM {$this->table} WHERE id = :id";
                  $stmt = $this->db->prepare($query);
                  $stmt->execute(['id' => $id]);
                  return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
            } catch (PDOException $e) {
                  error_log("Error fetching price by ID: " . $e->getMessage());
                  return null;
            }
      }

      public function getByProductId(string $productId): ?array
      {
            try {
                  $query = "SELECT * FROM {$this->table} WHERE product_id = :product_id";
                  $stmt = $this->db->prepare($query);
                  $stmt->execute(['product_id' => $productId]);
                  return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                  error_log("Error fetching prices by product ID: " . $e->getMessage());
                  return null;
            }
      }
}
