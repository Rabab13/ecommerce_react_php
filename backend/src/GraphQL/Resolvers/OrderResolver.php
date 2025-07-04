<?php
// src/GraphQL/Resolvers/OrderResolver.php

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use Exception;

class OrderResolver
{
      private $orderModel;

      public function __construct(Order $orderModel)
      {
            $this->orderModel = $orderModel;
      }

      public function resolveInsertOrder($root, $args)
      {
            try {
                  $input = $args['input'];

                  error_log("InsertOrder Input: " . json_encode($input));

                  $orderId = $this->orderModel->insert($input);

                  if ($orderId) {

                        return $this->orderModel->findById($orderId);
                  } else {
                        throw new Exception("Failed to insert order.");
                  }
            } catch (Exception $e) {

                  error_log("Error in resolveInsertOrder: " . $e->getMessage());
                  return null;
            }
      }
}
