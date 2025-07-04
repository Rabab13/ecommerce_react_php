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


      public function resolveProducts($root, array $args, $context, $info): array
      {
            try {
                  $products = $this->productModel->findAll();
                  error_log("Fetched products: " . print_r($products, true));

                  return $products ?? [];
            } catch (\Exception $e) {
                  error_log("Error fetching products: " . $e->getMessage());
                  return [];
            }
      }

      public function resolveProductsByCategory($root, array $args, $context, $info): array
      {
            $categoryId = $args['categoryId'] ?? null;
            $categoryName = $args['categoryName'] ?? null;

            error_log("Fetching products for category ID: $categoryId and category name: $categoryName");

            try {
                  if ($categoryId === null || strtolower($categoryName) === 'all') {
                        $products = $this->productModel->findAll();
                  } else {
                        $products = $this->productModel->getByCategoryId($categoryId);
                  }
                  error_log("Fetched products: " . print_r($products, true));

                  return $products ?? [];
            } catch (\Exception $e) {
                  error_log("Error fetching products: " . $e->getMessage());
                  return [];
            }
      }
      public function resolveProduct($root, array $args, $context, $info)
      {
            $id = $args['id'];
            return $this->productModel->findById($id);
      }
}
