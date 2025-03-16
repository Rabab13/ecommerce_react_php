<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

abstract class BaseType extends ObjectType
{
      public function __construct(array $config = [])
      {
            // Merge the base fields with the provided configuration
            $config = array_merge([
                  'fields' => $this->getBaseFields(),
            ], $config);

            parent::__construct($config);
      }

      /**
       * Get the base fields for the type.
       *
       * @return array
       */
      abstract protected function getBaseFields(): array;
}
