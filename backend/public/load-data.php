<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/Database/Database.php';
require_once __DIR__ . '/../src/Models/Category.php';
require_once __DIR__ . '/../src/Models/Product.php';
require_once __DIR__ . '/../src/Models/Attribute.php';
require_once __DIR__ . '/../src/Models/AttributeItem.php';
require_once __DIR__ . '/../src/Models/AttributeSet.php';
require_once __DIR__ . '/../src/Models/Price.php';
require_once __DIR__ . '/../src/Models/Currency.php';
require_once __DIR__ . '/../src/Models/Order.php';

use App\Database\Database;
use App\Models\Category;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\AttributeItem;
use App\Models\AttributeSet;
use App\Models\Price;
use App\Models\Currency;
use App\Models\Order;

// Initialize database connection
$db = new Database();
$connection = $db->getConnection();

// Start a transaction
$connection->beginTransaction();

try {
      // Load data from data.json
      $jsonData = file_get_contents(__DIR__ . '/data/data.json'); // Correct path to data.json
      $data = json_decode($jsonData, true);

      if ($data === null) {
            throw new Exception('Error parsing JSON file.');
      }

      // Insert categories
      foreach ($data['data']['categories'] as $categoryData) {
            $categoryModel = new Category($connection);
            $existingCategory = $categoryModel->findByName($categoryData['name']);

            if (!$existingCategory) {
                  $categoryModel->insert([
                        'name' => $categoryData['name'],
                        '__typename' => $categoryData['__typename'],
                  ]);
            }
      }

      // Insert products
      foreach ($data['data']['products'] as $productData) {
            $productModel = new Product($connection);
            $existingProduct = $productModel->findById($productData['id']);

            if ($existingProduct) {
                  $productModel->update($productData['id'], [
                        'name' => $productData['name'],
                        'inStock' => $productData['inStock'] ? 1 : 0,
                        'description' => $productData['description'],
                        'brand' => $productData['brand'],
                        'price' => $productData['prices'][0]['amount'],
                        'category_id' => $existingProduct['category_id'],
                        '__typename' => $productData['__typename'],
                  ]);
            } else {
                  $categoryName = $productData['category'];
                  $categoryModel = new Category($connection);
                  $category = $categoryModel->findByName($categoryName);

                  if (!$category) {
                        $categoryModel->insert(['name' => $categoryName, '__typename' => $categoryData['__typename']]);
                        $category = $categoryModel->findByName($categoryName);
                  }

                  $productModel->insert([
                        'id' => $productData['id'],
                        'name' => $productData['name'],
                        'inStock' => $productData['inStock'] ? 1 : 0,
                        'description' => $productData['description'],
                        'category_id' => $category['id'],
                        'brand' => $productData['brand'],
                        'price' => $productData['prices'][0]['amount'],
                        '__typename' => $productData['__typename'],
                  ]);
            }

            // Insert gallery images
            foreach ($productData['gallery'] as $imageUrl) {
                  $query = "INSERT INTO gallery (product_id, image_url) VALUES (:product_id, :image_url)";
                  $stmt = $connection->prepare($query);
                  $stmt->execute([
                        ':product_id' => $productData['id'],
                        ':image_url' => $imageUrl,
                  ]);
            }

            // Insert attributes
            if (isset($productData['attributes']) && is_array($productData['attributes'])) {
                  foreach ($productData['attributes'] as $attributeSetData) {
                        $attributeModel = new Attribute($connection);
                        $existingAttribute = $attributeModel->findByName($attributeSetData['name']);

                        if (!$existingAttribute) {
                              $attributeModel->insert([
                                    'name' => $attributeSetData['name'],
                                    'type' => $attributeSetData['type'],
                                    'product_id' => $productData['id'],
                              ]);
                        }
                  }
            }

            // Insert attribute sets and items
            if (isset($productData['attributes']) && is_array($productData['attributes'])) {
                  foreach ($productData['attributes'] as $attributeSetData) {
                        $attributeSetModel = new AttributeSet($connection);
                        $existingAttributeSet = $attributeSetModel->getByProductIdAndName($productData['id'], $attributeSetData['name']);

                        if (!$existingAttributeSet) {
                              $attributeSetModel->insert([
                                    'name' => $attributeSetData['name'],
                                    'type' => $attributeSetData['type'],
                                    'product_id' => $productData['id'],
                                    '__typename' => $attributeSetData['__typename'],
                              ]);

                              $attributeSet = $attributeSetModel->getByProductIdAndName($productData['id'], $attributeSetData['name']);
                              $attributeSetId = $attributeSet['id'];

                              if (isset($attributeSetData['items']) && is_array($attributeSetData['items'])) {
                                    foreach ($attributeSetData['items'] as $attributeItemData) {
                                          $attributeItemModel = new AttributeItem($connection);
                                          $attributeItemModel->insert([
                                                'display_value' => $attributeItemData['displayValue'],
                                                'value' => $attributeItemData['value'],
                                                'attribute_set_id' => $attributeSetId,
                                                '__typename' => $attributeItemData['__typename'],
                                          ]);
                                    }
                              }
                        }
                  }
            }

            // Insert prices
            foreach ($productData['prices'] as $priceData) {
                  $priceModel = new Price($connection);
                  $priceModel->insert([
                        'amount' => $priceData['amount'],
                        'currency_label' => $priceData['currency']['label'],
                        'currency_symbol' => $priceData['currency']['symbol'],
                        'product_id' => $productData['id'],
                        '__typename' => $priceData['__typename'],
                  ]);
            }
      }

      // Roll back the transaction (for testing purposes)
      $connection->rollBack();
      echo "Test completed successfully. No changes were made to the database.";
} catch (\Exception $e) {
      // Roll back the transaction in case of an error
      $connection->rollBack();
      echo "Error: " . $e->getMessage();
}
