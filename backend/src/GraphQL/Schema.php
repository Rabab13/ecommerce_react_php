<?php
// src/GraphQL/Schema.php

namespace App\GraphQL;

use GraphQL\Type\Schema as GraphQLSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Resolvers\CategoryResolver;
use App\GraphQL\Resolvers\ProductResolver;
use App\GraphQL\Resolvers\OrderResolver;
use App\GraphQL\Types\AttributeSetType;
use App\GraphQL\Types\AttributeItemType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\GalleryType;
use App\GraphQL\Types\InsertOrderInputType;
use App\GraphQL\Types\OrderType;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use PDO;

class Schema
{
      public static function create(PDO $db): GraphQLSchema
      {

            $categoryModel = new Category($db);
            $productModel = new Product($db);
            $orderModel = new Order($db);

            $categoryResolver = new CategoryResolver($categoryModel);
            $productResolver = new ProductResolver($productModel);
            $orderResolver = new OrderResolver($orderModel);


            $categoryType = new CategoryType();
            $attributeItemType = new AttributeItemType();
            $attributeSetType = new AttributeSetType($attributeItemType);
            $galleryType = new GalleryType();
            $productType = new ProductType($categoryType, $attributeSetType, $galleryType, $productModel);
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
                                    'categoryId' => ['type' => Type::id()],
                                    'categoryName' => ['type' => Type::string()],
                              ],
                              'resolve' => [$productResolver, 'resolveProductsByCategory'],
                        ],
                  ],
            ]);

            $mutationType = new ObjectType([
                  'name' => 'Mutation',
                  'fields' => [
                        'insertOrder' => [
                              'type' => $orderType,
                              'args' => [
                                    'input' => [
                                          'type' => Type::nonNull($insertOrderInputType),
                                    ],
                              ],
                              'resolve' => [$orderResolver, 'resolveInsertOrder'],
                        ],
                  ],
            ]);

            return new GraphQLSchema([
                  'query' => $queryType,
                  'mutation' => $mutationType,
            ]);
      }
}
