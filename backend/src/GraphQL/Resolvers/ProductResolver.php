<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductResolver
{
      private $productModel;

      public function __construct(Product $productModel)
      {
            $this->productModel = $productModel;
      }
      //Find a product by ID
      public function resolveProduct($root, array $args, $context, $info): ?array
      {
            try {
                  $id = $args['id'];
                  return $this->productModel->findById($id);
            } catch (\Exception $e) {
                  error_log("Error fetching product: " . $e->getMessage());
                  return null;
            }
      }
      public function resolveProducts($root, array $args, $context, $info): array
      {
            try {
                  return $this->productModel->findAll() ?? [];
            } catch (\Exception $e) {
                  error_log("Error fetching products: " . $e->getMessage());
                  return [];
            }
      }

      public function resolveProductsByCategory($root, array $args, $context, $info): array
      {
            $categoryId = $args['categoryId'] ?? null;
            $categoryName = $args['categoryName'] ?? null;

            try {
                  if ($categoryId) {
                        return $this->productModel->getByCategoryId($categoryId);
                  } elseif ($categoryName && strtolower($categoryName) !== 'all') {
                        return $this->productModel->getByCategoryName($categoryName);
                  }
                  return $this->productModel->findAll() ?? [];
            } catch (\Exception $e) {
                  error_log("Error fetching products by category: " . $e->getMessage());
                  return [];
            }
      }

      public function resolveProductById($root, array $args): ?array
      {
            try {
                  $id = (string)$args['id']; // Ensure ID is treated as string
                  return $this->productModel->findById($id);
            } catch (\Exception $e) {
                  error_log("Error fetching product by ID: " . $e->getMessage());
                  return null;
            }
      }
}
