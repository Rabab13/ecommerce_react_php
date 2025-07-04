<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\AttributeItemType;

class AttributeSetType extends ObjectType
{
      public function __construct(AttributeItemType $attributeItemType)
      {
            parent::__construct([
                  'name' => 'AttributeSet',
                  'description' => 'A set of attributes for a product',
                  'fields' => [
                        'id' => ['type' => Type::id()],
                        'name' => ['type' => Type::string()],
                        'type' => ['type' => Type::string()],
                        'items' => [
                              'type' => Type::listOf($attributeItemType),
                        ],
                  ],
            ]);
      }
}
