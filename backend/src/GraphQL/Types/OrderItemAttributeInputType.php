<?php
// src/GraphQL/Types/OrderItemAttributeInputType.php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemAttributeInputType extends InputObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'OrderItemAttributeInput',  // Matches the input type name in the schema
                  'fields' => [
                        'name' => [
                              'type' => Type::nonNull(Type::string()),
                              'description' => 'The name of the attribute',
                        ],
                        'value' => [
                              'type' => Type::nonNull(Type::string()),
                              'description' => 'The value of the attribute',
                        ],
                  ],
            ]);
      }
}
