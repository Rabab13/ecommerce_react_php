<?php

namespace App\Models;

interface ModelInterface
{

      public function insert(array $data): mixed;
      public function findAll(): ?array;
      public function findById(int|string $id): ?array;
}
