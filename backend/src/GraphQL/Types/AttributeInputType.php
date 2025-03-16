<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class AttributeInputType extends InputObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'AttributeInput',
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
