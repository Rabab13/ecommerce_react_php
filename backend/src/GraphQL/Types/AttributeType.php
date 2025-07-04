<?php

// src/GraphQL/Types/AttributeType.php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'Attribute',
                  'fields' => [
                        'name' => [
                              'type' => Type::string(),
                              'description' => 'The name of the attribute',
                        ],
                        'value' => [
                              'type' => Type::string(),
                              'description' => 'The value of the attribute',
                        ],
                  ],
            ]);
      }
}
