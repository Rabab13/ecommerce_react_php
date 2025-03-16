<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Product;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\AttributeSetType;
use App\GraphQL\Types\GalleryType; // Import GalleryType

class ProductType extends ObjectType
{
      private $productModel;

      public function __construct(
            CategoryType $categoryType,
            AttributeSetType $attributeSetType,
            GalleryType $galleryType,
            Product $productModel
      ) {
            $this->productModel = $productModel;

            parent::__construct([
                  'name' => 'Product',
                  'description' => 'A product type',
                  'fields' => [
                        'id' => ['type' => Type::id()],
                        'name' => ['type' => Type::string()],
                        'inStock' => ['type' => Type::boolean()],
                        'description' => ['type' => Type::string()],
                        'category' => [
                              'type' => $categoryType,
                              'resolve' => fn($product) => $this->productModel->getCategoryByProductId($product['id']),
                        ],
                        'attributes' => [
                              'type' => Type::listOf($attributeSetType), // Use AttributeSetType
                              'resolve' => fn($product) => $this->productModel->getAttributesByProductId($product['id']),
                        ],
                        'prices' => [
                              'type' => Type::listOf(new PriceType()),
                              'resolve' => fn($product) => $this->productModel->getPricesByProductId($product['id']),
                        ],
                        'gallery' => [
                              'type' => Type::listOf($galleryType),
                              'resolve' => fn($product) => $this->productModel->getGalleryByProductId($product['id']),
                        ],
                        'brand' => [
                              'type' => Type::string(),
                              'resolve' => fn($product) => $product['brand'] ?? null,
                        ],
                        '__typename' => [
                              'type' => Type::string(),
                              'resolve' => fn() => 'Product',
                        ],
                  ],
            ]);
      }
}
