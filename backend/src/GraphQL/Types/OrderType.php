<?php
// src/GraphQL/Types/OrderType.php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'Order',
                  'fields' => [
                        'id' => [
                              'type' => Type::id(),
                              'description' => 'The ID of the order',
                        ],
                        'total_amount' => [
                              'type' => Type::float(),
                              'description' => 'The total amount of the order',
                        ],
                        'currency' => [
                              'type' => Type::string(),
                              'description' => 'The currency of the order',
                        ],
                        'items' => [
                              'type' => Type::listOf(new OrderItemType()),
                              'description' => 'The items in the order',
                        ],
                  ],
            ]);
      }
}
