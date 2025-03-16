<?php

namespace App\Models;

use PDO;

abstract class AbstractModel
{
      protected $db;

      public function __construct(PDO $db)
      {
            $this->db = $db;
      }

      abstract protected function getTableName(): string;

      public function getById(int $id): ?array
      {
            $query = "SELECT * FROM {$this->getTableName()} WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
      }

      public function getAll(): array
      {
            $query = "SELECT * FROM {$this->getTableName()}";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
      }

      public function getByProductId(int $productId): array
      {
            $query = "SELECT * FROM {$this->getTableName()} WHERE product_id = :productId";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':productId', $productId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
      }
}
