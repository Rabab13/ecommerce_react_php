<?php

namespace App\GraphQL;

use GraphQL\Type\Schema as GraphQLSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use PDO;

class Schema
{
      public static function create(PDO $db): GraphQLSchema
      {
            $productModel = new Product($db);
            $categoryModel = new Category($db);
            $orderModel = new Order($db);

            // === Define Types ===
            $categoryType = new ObjectType([
                  'name' => 'Category',
                  'fields' => [
                        'id' => Type::id(),
                        'name' => Type::string(),
                  ],
            ]);

            $productType = new ObjectType([
                  'name' => 'Product',
                  'fields' => [
                        'id' => Type::id(),
                        'name' => Type::string(),
                        'price' => Type::float(),
                        'category_id' => Type::id(),
                  ],
            ]);

            $orderType = new ObjectType([
                  'name' => 'Order',
                  'fields' => [
                        'id' => Type::id(),
                        'product_id' => Type::id(),
                        'quantity' => Type::int(),
                        'total' => Type::float(),
                  ],
            ]);

            $insertOrderInputType = new ObjectType([
                  'name' => 'InsertOrderInput',
                  'fields' => [
                        'product_id' => Type::nonNull(Type::id()),
                        'quantity' => Type::nonNull(Type::int()),
                  ],
            ]);

            // === Define Query ===
            $queryType = new ObjectType([
                  'name' => 'Query',
                  'fields' => [
                        'categories' => [
                              'type' => Type::listOf($categoryType),
                              'resolve' => fn() => $categoryModel->findAll() ?? [],
                        ],
                        'products' => [
                              'type' => Type::listOf($productType),
                              'resolve' => fn() => $productModel->findAll() ?? [],
                        ],
                        'productsByCategory' => [
                              'type' => Type::listOf($productType),
                              'args' => [
                                    'categoryId' => ['type' => Type::id()],
                                    'categoryName' => ['type' => Type::string()],
                              ],
                              'resolve' => function ($root, $args) use ($productModel) {
                                    if (!empty($args['categoryId'])) {
                                          return $productModel->getByCategoryId($args['categoryId']);
                                    }
                                    if (!empty($args['categoryName']) && strtolower($args['categoryName']) !== 'all') {
                                          return $productModel->getByCategoryName($args['categoryName']);
                                    }
                                    return $productModel->findAll();
                              },
                        ],
                        'product' => [
                              'type' => $productType,
                              'args' => [
                                    'id' => Type::nonNull(Type::id()),
                              ],
                              'resolve' => fn($root, $args) => $productModel->findById($args['id']),
                        ],
                  ],
            ]);

            // === Define Mutation ===
            $mutationType = new ObjectType([
                  'name' => 'Mutation',
                  'fields' => [
                        'insertOrder' => [
                              'type' => $orderType,
                              'args' => [
                                    'input' => [
                                          'type' => Type::nonNull(
                                                new ObjectType([
                                                      'name' => 'OrderInput',
                                                      'fields' => [
                                                            'product_id' => Type::nonNull(Type::id()),
                                                            'quantity' => Type::nonNull(Type::int()),
                                                      ],
                                                ])
                                          ),
                                    ],
                              ],
                              'resolve' => function ($root, $args) use ($orderModel) {
                                    $input = $args['input'];
                                    $orderId = $orderModel->insert($input);
                                    return $orderId ? $orderModel->findById($orderId) : null;
                              },
                        ],
                  ],
            ]);

            return new GraphQLSchema([
                  'query' => $queryType,
                  'mutation' => $mutationType,
            ]);
      }
}
