<?php

namespace App\GraphQL\Resolvers;

use App\Models\Category;

class CategoryResolver
{
      private $categoryModel;

      public function __construct(Category $categoryModel)
      {
            $this->categoryModel = $categoryModel;
      }

      public function resolveCategories(): array
      {
            return $this->categoryModel->findAll() ?? [];
      }

      public function resolveCategoryById(array $args): ?array
      {
            return $this->categoryModel->findById($args['id']);
      }
}
