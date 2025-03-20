<?php

namespace App\Seeders;

use App\Database\Database;
use PDO;
use Exception;

class DatabaseSeeder
{
      private PDO $connection;

      public function __construct()
      {
            $this->connection = Database::getInstance()->getConnection();
      }

      public function run(): void
      {
            try {
                  $this->connection->beginTransaction();

                  // Load data
                  $data = json_decode(file_get_contents(__DIR__ . '/../../data/data.json'), true);
                  if (!$data) {
                        throw new Exception("Invalid or empty data.json");
                  }

                  $this->seedProducts($data['products'] ?? []);
                  $this->seedCategories($data['categories'] ?? []);
                  // Add other seed methods as needed

                  $this->connection->commit();
                  echo "✅ Data seeded successfully.\n";
            } catch (Exception $e) {
                  $this->connection->rollBack();
                  error_log("❌ Seeder error: " . $e->getMessage());
                  echo "❌ Seeding failed. Check logs.\n";
            }
      }

      private function seedProducts(array $products): void
      {
            $stmt = $this->connection->prepare("
            INSERT INTO products (id, name, price)
            VALUES (:id, :name, :price)
            ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price)
        ");

            foreach ($products as $product) {
                  $stmt->execute([
                        ':id' => $product['id'],
                        ':name' => $product['name'],
                        ':price' => $product['price'],
                  ]);
            }
      }

      private function seedCategories(array $categories): void
      {
            $stmt = $this->connection->prepare("
            INSERT INTO categories (id, name)
            VALUES (:id, :name)
            ON DUPLICATE KEY UPDATE name = VALUES(name)
        ");

            foreach ($categories as $category) {
                  $stmt->execute([
                        ':id' => $category['id'],
                        ':name' => $category['name'],
                  ]);
            }
      }
}
