<?php
// src/GraphQL/Types/InsertOrderInputType.php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class InsertOrderInputType extends InputObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'InsertOrderInput',
                  'fields' => [
                        'total_amount' => [
                              'type' => Type::float(),
                              'description' => 'The total amount of the order',
                        ],
                        'currency' => [
                              'type' => Type::string(),
                              'description' => 'The currency of the order',
                        ],
                        'items' => [
                              'type' => Type::listOf(new OrderItemInputType()),
                              'description' => 'The items in the order',
                        ],
                  ],
            ]);
      }
}
