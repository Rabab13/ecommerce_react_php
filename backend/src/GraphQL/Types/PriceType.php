<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'Price',
                  'description' => 'A price type',
                  'fields' => [
                        'amount' => ['type' => Type::float()],
                        'currency' => [
                              'type' => new ObjectType([
                                    'name' => 'Currency',
                                    'fields' => [
                                          'label' => ['type' => Type::string()],
                                          'symbol' => ['type' => Type::string()],
                                    ],
                              ]),
                        ],
                  ],
            ]);
      }
}
