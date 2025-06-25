<?php

namespace App\Models;

use PDO;
use PDOException;

class Product extends BaseModel implements ModelInterface
{
    protected string $table = 'products';

    public function __construct(PDO $db)
    {
        parent::__construct($db);
    }


    public function findAll(): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table}");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            $this->logError("Error fetching all products: " . $e->getMessage());
            return null;
        }
    }

    public function findById($id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            $this->logError("Error fetching product by ID: " . $e->getMessage());
            return null;
        }
    }

    public function getByCategoryId(int $categoryId): array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE category_id = :category_id");
            $stmt->execute(['category_id' => $categoryId]);
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($products)) {
                error_log("No products found for category ID: $categoryId");
                return [];
            }
            error_log("Fetched products: " . print_r($products, true));

            return $products;
        } catch (PDOException $e) {
            error_log("Error fetching products by category ID: " . $e->getMessage());
            return [];
        }
    }
    public function getByCategoryName(string $categoryName): array
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE category_name = :category_name");
            $stmt->execute(['category_name' => $categoryName]);
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($products)) {
                error_log("No products found for category name: $categoryName");
                return [];
            }
            error_log("Fetched products: " . print_r($products, true));

            return $products;
        } catch (PDOException $e) {
            error_log("Error fetching products by category name: " . $e->getMessage());
            return [];
        }
    }

    public function getCategoryByProductId(string $productId): ?array
    {
        try {
            $stmt = $this->db->prepare("
                SELECT c.id, c.name 
                FROM categories c
                JOIN products p ON c.id = p.category_id
                WHERE p.id = :product_id
            ");
            $stmt->execute([':product_id' => $productId]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            $this->logError("Error fetching category for product ID {$productId}: " . $e->getMessage());
            return null;
        }
    }


    public function getGalleryByProductId(string $productId): array
    {
        try {
            $stmt = $this->db->prepare("SELECT id, image_url FROM gallery WHERE product_id = :product_id");
            $stmt->execute([':product_id' => $productId]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            $this->logError("Error fetching gallery for product ID {$productId}: " . $e->getMessage());
            return [];
        }
    }


    public function getAttributesByProductId($productId): array
    {
        $query = "
        SELECT a.id, a.name, a.type
        FROM attributes a
        JOIN product_attributes pa ON pa.attribute_id = a.id
        WHERE pa.product_id = :productId
    ";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':productId', $productId);
        $stmt->execute();
        $attributes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch attribute items for each attribute
        foreach ($attributes as &$attribute) {
            $attrId = $attribute['id'];
            $itemsStmt = $this->db->prepare("SELECT id, value, displayValue FROM attribute_items WHERE attribute_id = :attrId");
            $itemsStmt->bindParam(':attrId', $attrId);
            $itemsStmt->execute();
            $attribute['items'] = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return $attributes;
    }

    public function getPricesByProductId(string $productId): array
    {
        try {
            $stmt = $this->db->prepare("
                SELECT amount, currency_label AS label, currency_symbol AS symbol 
                FROM prices 
                WHERE product_id = :product_id
            ");
            $stmt->execute([':product_id' => $productId]);
            $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return array_map(function ($price) {
                return [
                    'amount' => (float)$price['amount'],
                    'currency' => [
                        'label' => $price['label'],
                        'symbol' => $price['symbol'],
                    ],
                ];
            }, $prices);
        } catch (PDOException $e) {
            $this->logError("Error fetching prices for product ID {$productId}: " . $e->getMessage());
            return [];
        }
    }
}
