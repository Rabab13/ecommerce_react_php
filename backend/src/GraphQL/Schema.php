<?php

namespace App\GraphQL;

use GraphQL\Type\Schema as GraphQLSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Resolvers\CategoryResolver;
use App\GraphQL\Resolvers\ProductResolver;
use App\GraphQL\Resolvers\OrderResolver;
use App\GraphQL\Types\{
      AttributeSetType,
      AttributeItemType,
      CategoryType,
      GalleryType,
      PriceType,  // Added this
      ProductType,
      InsertOrderInputType,
      OrderType
};
use App\Models\{Category, Product, Order};
use PDO;

class Schema
{
      public static function create(PDO $db): GraphQLSchema
      {
            // Initialize models first
            $categoryModel = new Category($db);
            $productModel = new Product($db);
            $orderModel = new Order($db);

            // Initialize resolvers
            $categoryResolver = new CategoryResolver($categoryModel);
            $productResolver = new ProductResolver($productModel);
            $orderResolver = new OrderResolver($orderModel);

            // Initialize basic types first
            $categoryType = new CategoryType();
            $attributeItemType = new AttributeItemType();
            $attributeSetType = new AttributeSetType($attributeItemType);
            $galleryType = new GalleryType();
            $priceType = new PriceType();

            // Then complex types that depend on others
            $productType = new ProductType(
                  $categoryType,
                  $attributeSetType,
                  $galleryType,
                  $priceType,
                  $productModel
            );

            $insertOrderInputType = new InsertOrderInputType();
            $orderType = new OrderType();

            $queryType = new ObjectType([
                  'name' => 'Query',
                  'fields' => [
                        'categories' => [
                              'type' => Type::listOf($categoryType),
                              'resolve' => [$categoryResolver, 'resolveCategories'],
                        ],
                        'products' => [
                              'type' => Type::listOf($productType),
                              'resolve' => [$productResolver, 'resolveProducts'],
                        ],
                        'productsByCategory' => [
                              'type' => Type::listOf($productType),
                              'args' => [
                                    'categoryId' => Type::id(),
                                    'categoryName' =>
                                    Type::string(),
                              ],
                              'resolve' => [$productResolver, 'resolveProductsByCategory'],
                        ],
                        'product' => [
                              'type' => $productType,
                              'args' => [
                                    'id' => Type::nonNull(Type::id()),
                              ],
                              'resolve' => [$productResolver, 'resolveProduct'],
                        ],
                  ]
            ]);

            $mutationType = new ObjectType([
                  'name' => 'Mutation',
                  'fields' => [
                        'insertOrder' => [
                              'type' => $orderType,
                              'args' => [
                                    'input' => Type::nonNull($insertOrderInputType),
                              ],
                              'resolve' => [$orderResolver, 'resolveInsertOrder'],
                        ],
                  ],
            ]);

            $types = [
                  'Category' => $categoryType,
                  'AttributeItem' => $attributeItemType,
                  'AttributeSet' => $attributeSetType,
                  'Gallery' => $galleryType,
                  'Price' => $priceType,
                  'Product' => $productType,
                  'InsertOrderInput' => $insertOrderInputType,
                  'Order' => $orderType,
            ];

            return new GraphQLSchema([
                  'query' => $queryType,
                  'mutation' => $mutationType,
            ]);
      }
}
