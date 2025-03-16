<?php
// src/GraphQL/Resolvers/AttributeResolver.php

namespace App\GraphQL\Resolvers;

use App\Models\AttributeItem;
use App\Models\AttributeSet;
use Exception;
use PDO;

class AttributeResolver extends AbstractResolver
{
      public function getAttributeItems(int $attributeId): array
      {
            try {
                  $attributeItemModel = new AttributeItem($this->db);
                  $items = $attributeItemModel->getByAttributeId($attributeId);

                  if (empty($items)) {
                        throw new Exception("No attribute items found.");
                  }

                  return $items;
            } catch (Exception $e) {
                  $this->logError("Error in AttributeResolver: " . $e->getMessage());
                  throw new Exception("Failed to fetch attribute items.");
            }
      }

      public function getAttributeSets(int $productId): array
      {
            try {
                  $attributeSetModel = new AttributeSet($this->db);
                  $sets = $attributeSetModel->getByProductId($productId);

                  if (empty($sets)) {
                        throw new Exception("No attribute sets found.");
                  }

                  return $sets;
            } catch (Exception $e) {
                  $this->logError("Error in AttributeResolver: " . $e->getMessage());
                  throw new Exception("Failed to fetch attribute sets.");
            }
      }

      public function getAttributesForProduct(int $productId): array
      {
            try {

                  $sql = "SELECT DISTINCT a.id, a.name, a.type, a.product_id
                    FROM attributes a
                    WHERE a.product_id = :product_id";
                  $stmt = $this->db->prepare($sql);
                  $stmt->execute(['product_id' => $productId]);
                  $attributes = $stmt->fetchAll(PDO::FETCH_ASSOC);


                  foreach ($attributes as &$attribute) {
                        $attributeId = $attribute['id'];
                        $attribute['items'] = $this->getAttributeItems($attributeId);
                  }

                  return $attributes;
            } catch (Exception $e) {
                  $this->logError("Error in AttributeResolver: " . $e->getMessage());
                  throw new Exception("Failed to fetch attributes for product.");
            }
      }
}
