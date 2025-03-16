<?php
// index.php

// CORS Headers for GraphQL
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(200);
      exit();
}

// Autoload and Database Setup
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/Database/Database.php';
require_once __DIR__ . '/../src/GraphQL/Schema.php';

use App\Database\Database;
use App\GraphQL\Schema;
use GraphQL\GraphQL;

// Use the Singleton pattern to get the database connection
$db = Database::getInstance()->getConnection();

// Create the schema
$schema = Schema::create($db);

// Get the raw input from the request
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Extract the query and variables
$query = $input['query'] ?? null;
$variableValues = $input['variables'] ?? null;

// Log the GraphQL query
error_log("GraphQL Query: " . $query);

// Execute the GraphQL query
try {
      $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
      $output = $result->toArray();
} catch (\Exception $e) {
      $output = [
            'errors' => [
                  [
                        'message' => $e->getMessage(),
                        'extensions' => [
                              'file' => $e->getFile(),
                              'line' => $e->getLine(),
                        ],
                  ],
            ],
      ];
}

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($output);

// Close the database connection (optional, as it closes automatically at the end of the script)
$db = null;
