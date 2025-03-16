<?php
// src/Models/Order.php

namespace App\Models;

use Ramsey\Uuid\Uuid;
use PDO;

class Order extends BaseModel
{
    protected function getTableName(): string
    {
        return 'orders';
    }

    public function insert(array $data): mixed
    {
        try {
            $uuid = Uuid::uuid4()->toString();
            $data['id'] = $uuid;

            $totalAmount = 0;
            if (isset($data['items']) && is_array($data['items'])) {
                foreach ($data['items'] as $item) {
                    $totalAmount += $item['price'] * $item['quantity'];
                }
            }

            $dbData = [
                'id' => $uuid,
                'total_amount' => $totalAmount,
                'currency' => $data['currency'],
            ];

            error_log("Data to insert into orders table: " . json_encode($dbData));

            $query = "INSERT INTO orders (id, total_amount, currency) VALUES (:id, :total_amount, :currency)";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute($dbData);

            if ($result) {
                error_log("Successfully inserted into orders table. Order ID: " . $uuid);
                if (isset($data['items']) && is_array($data['items'])) {
                    $orderItemModel = new OrderItem($this->db);
                    foreach ($data['items'] as $item) {
                        $orderItemData = [
                            'order_id' => $uuid,
                            'product_id' => $item['productId'],
                            'product_name' => $item['productName'],
                            'quantity' => $item['quantity'],
                            'price' => $item['price'],
                        ];

                        error_log("Data to insert into order_items table: " . json_encode($orderItemData));

                        $orderItemModel->insert($orderItemData);
                    }
                }

                return $uuid;
            } else {
                $errorInfo = $stmt->errorInfo();
                error_log("Failed to insert into orders table: " . json_encode($errorInfo));
                return false;
            }
        } catch (\Exception $e) {
            error_log("Error inserting order: " . $e->getMessage());
            return false;
        }
    }
    public function findById($id): ?array
    {
        $query = "SELECT * FROM orders WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['id' => $id]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$order) {
            return null;
        }

        $orderItemModel = new OrderItem($this->db);
        $items = $orderItemModel->findByOrderId($id);
        $order['items'] = $items;

        return $order;
    }
}
