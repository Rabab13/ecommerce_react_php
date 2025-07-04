<?php


return [
      'schemas' => [
            'default' => __DIR__ . '/../src/GraphQL/schema.graphql',
      ],
      'types' => [],
      'resolvers' => [
            'App\GraphQL\Resolvers\CategoryResolver',
            'App\GraphQL\Resolvers\ProductResolver',
            'App\GraphQL\Resolvers\MutationResolver',
      ],
];
