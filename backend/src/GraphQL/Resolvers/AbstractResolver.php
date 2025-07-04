<?php

namespace App\GraphQL\Resolvers;

use Exception;
use PDO;

abstract class AbstractResolver
{
      protected $db;

      public function __construct(PDO $db)
      {
            $this->db = $db;
      }

      protected function validateData(array $data): array
      {
            return array_map(function ($item) {
                  if (!isset($item['name']) || !is_string($item['name'])) {
                        $item['name'] = '';
                  }
                  return $item;
            }, $data);
      }

      protected function logError(string $message): void
      {
            error_log($message);
      }
}
