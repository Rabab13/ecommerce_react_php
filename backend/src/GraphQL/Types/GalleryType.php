<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class GalleryType extends ObjectType
{
      public function __construct()
      {
            parent::__construct([
                  'name' => 'Gallery',
                  'description' => 'A gallery type',
                  'fields' => [
                        'id' => ['type' => Type::id()],
                        'image_url' => ['type' => Type::string()],
                        '__typename' => ['type' => Type::string()],
                  ],
            ]);
      }
}
