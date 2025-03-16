<?php
// src/Models/Currency.php

namespace App\Models;

use PDO;
use PDOException;

class Currency extends BaseModel implements ModelInterface
{
      protected string $table = 'currencies';


      public function insert(array $data): bool
      {
            try {
                  $query = "INSERT INTO {$this->table} (code, symbol, label) VALUES (:code, :symbol, :label)";
                  $stmt = $this->db->prepare($query);
                  return $stmt->execute($data);
            } catch (PDOException $e) {
                  error_log("Error inserting currency: " . $e->getMessage());
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
                  error_log("Error fetching currencies: " . $e->getMessage());
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
                  error_log("Error fetching currency by ID: " . $e->getMessage());
                  return null;
            }
      }
}
