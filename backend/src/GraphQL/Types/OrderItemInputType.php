<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\AttributeInputType;

class OrderItemInputType extends InputObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'OrderItemInput',
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
                              'type' => Type::listOf(new AttributeInputType()),
                              'description' => 'The attributes of the product',
                        ],
                  ],
            ]);
      }
}
