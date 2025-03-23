<?php

use Dotenv\Dotenv;

// Autoload dependencies first
require_once __DIR__ . '/../vendor/autoload.php';

// Load .env config
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
      getenv('CORS_ORIGIN'),           // From .env
      'http://localhost:5173',         // Local dev server
      'https://rococo-puppy-56bad8.netlify.app', // Your Netlify frontend URL
      'https://*.netlify.app',         // Allow all Netlify preview URLs
];

// Allow any *.netlify.app domain dynamically
$allow_netlify = preg_match('/^https:\/\/[a-z0-9\-]+\.netlify\.app$/', $origin);

if (in_array($origin, $allowed_origins, true) || $allow_netlify) {
      header("Access-Control-Allow-Origin: $origin");
      header("Access-Control-Allow-Credentials: true");
} else {
      error_log("Disallowed Origin: $origin");
}

// Required headers
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(200);
      exit();
}

// Load App Dependencies
require_once __DIR__ . '/../src/Database/Database.php';
require_once __DIR__ . '/../src/GraphQL/Schema.php';

use App\Database\Database;
use App\GraphQL\Schema;
use GraphQL\GraphQL;

// Get DB connection (Singleton)
$db = Database::getInstance()->getConnection();

// Create GraphQL schema
$schema = Schema::create($db);

// Read GraphQL request
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$query = $input['query'] ?? null;
$variableValues = $input['variables'] ?? null;

// Debug the query
error_log("GraphQL Query: " . ($query ?? 'NULL'));

// Validate the query
if (empty($query)) {
      http_response_code(400); // Bad Request
      echo json_encode(['error' => 'No GraphQL query provided']);
      exit;
}

// Execute GraphQL query
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

// Output JSON response
header('Content-Type: application/json');
echo json_encode($output);

// Close DB connection (optional)
$db = null;
