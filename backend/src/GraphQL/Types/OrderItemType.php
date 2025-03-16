<?php
// src/GraphQL/Types/OrderItemType.php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'OrderItem',
                  'fields' => [
                        'productId' => [
                              'type' => Type::id(),
                              'description' => 'The ID of the product',
                        ],
                        'productName' => [
                              'type' => Type::string(),
                              'description' => 'The name of the product',
                        ],
                        'quantity' => [
                              'type' => Type::int(),
                              'description' => 'The quantity of the product',
                        ],
                        'price' => [
                              'type' => Type::float(),
                              'description' => 'The price of the product',
                        ],
                        'attributes' => [
                              'type' => Type::listOf(new OrderItemAttributeType()),
                              'description' => 'The attributes of the product',
                        ],
                  ],
            ]);
      }
}
