<?php



namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Product;

class ProductType extends ObjectType
{
      private $productModel;

      public function __construct(
            CategoryType $categoryType,
            AttributeSetType $attributeSetType,
            GalleryType $galleryType,
            PriceType $priceType,
            Product $productModel
      ) {
            $this->productModel = $productModel;

            parent::__construct([
                  'name' => 'Product',
                  'description' => 'A product entity',
                  'fields' => [
                        'id' => Type::nonNull(Type::id()),
                        'name' => Type::nonNull(Type::string()),
                        'description' => Type::string(),
                        'inStock' => ['type' => Type::boolean()],
                        'brand' => [
                              'type' => Type::string(),
                              'resolve' => fn($product) => $product['brand'] ?? null,
                        ],
                        'category_id' => [
                              'type' => Type::id(),
                              'resolve' => fn($product) => $product['category_id'] ?? null,
                        ],
                        'category' => [
                              'type' => $categoryType,
                              'resolve' => fn($product) => $this->productModel->getCategoryByProductId($product['id']),
                        ],
                        'prices' => [
                              'type' => Type::listOf($priceType),
                              'resolve' => fn($product) => $this->productModel->getPricesByProductId($product['id']),
                        ],
                        'gallery' => [
                              'type' => Type::listOf($galleryType),
                              'resolve' => fn($product) => $this->productModel->getGalleryByProductId($product['id']),
                        ],
                        'attributes' => [
                              'type' => Type::listOf($attributeSetType),
                              'resolve' => fn($product) => $this->productModel->getAttributesByProductId($product['id']),
                        ],
                  ],
            ]);
      }
}
