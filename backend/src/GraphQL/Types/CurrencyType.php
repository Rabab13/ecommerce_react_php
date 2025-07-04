<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'Currency',
                  'description' => 'A currency type',
                  'fields' => [
                        'label' => ['type' => Type::string()],
                        'symbol' => ['type' => Type::string()],
                        '__typename' => ['type' => Type::string()],
                  ],
            ]);
      }
}
