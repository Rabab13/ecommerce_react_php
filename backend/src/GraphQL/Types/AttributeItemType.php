<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'AttributeItem',
                  'description' => 'An item within an attribute set',
                  'fields' => [
                        'id' => ['type' => Type::id()],
                        'value' => ['type' => Type::string()],
                        'displayValue' => ['type' => Type::string()],
                        '__typename' => ['type' => Type::string()],
                  ],
            ]);
      }
}
