<?php
// src/Models/OrderItem.php

namespace App\Models;

use PDO;

class OrderItem extends BaseModel
{
      protected function getTableName(): string
      {
            return 'order_items';
      }

      public function insert(array $data): bool
      {
            try {
                  $columns = implode(', ', array_keys($data));
                  $values = ':' . implode(', :', array_keys($data));
                  $query = "INSERT INTO order_items ($columns) VALUES ($values)";
                  $stmt = $this->db->prepare($query);

                  error_log("Executing query: " . $query);
                  error_log("Data: " . json_encode($data));

                  if ($stmt->execute($data)) {
                        error_log("Successfully inserted into order_items table.");
                        return true;
                  } else {
                        $errorInfo = $stmt->errorInfo();
                        $this->logError("Failed to execute query: " . json_encode($errorInfo));
                        return false;
                  }
            } catch (\Exception $e) {
                  error_log("Error inserting order item: " . $e->getMessage() . "\n" . $e->getTraceAsString());
                  return false;
            }
      }

      public function findByOrderId($orderId): array
      {
            $query = "SELECT * FROM order_items WHERE order_id = :order_id";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['order_id' => $orderId]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
      }
}
