<?php
// src/Models/Gallery.php

namespace App\Models;

use PDO;
use PDOException;

class Gallery extends BaseModel implements ModelInterface
{
      protected string $table = 'gallery';


      public function insert(array $data): bool
      {
            try {
                  $query = "INSERT INTO {$this->table} (product_id, image_url) VALUES (:product_id, :image_url)";
                  $stmt = $this->db->prepare($query);
                  return $stmt->execute($data);
            } catch (PDOException $e) {
                  error_log("Error inserting gallery image: " . $e->getMessage());
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
                  error_log("Error fetching all gallery images: " . $e->getMessage());
                  return null;
            }
      }


      public function findById($id): ?array
      {
            try {
                  $query = "SELECT * FROM {$this->table} WHERE id = :id";
                  $stmt = $this->db->prepare($query);
                  $stmt->execute(['id' => $id]);
                  return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
            } catch (PDOException $e) {
                  error_log("Error fetching gallery image by ID: " . $e->getMessage());
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
                  error_log("Error fetching gallery by product ID: " . $e->getMessage());
                  return null;
            }
      }
}
