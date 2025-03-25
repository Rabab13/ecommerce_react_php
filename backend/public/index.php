<?php

use Dotenv\Dotenv;

// Autoload dependencies first
require_once __DIR__ . '/../vendor/autoload.php';

// Load .env config
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Enhanced CORS handling
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
      'https://rococo-puppy-56bad8.netlify.app',
      'http://localhost:5173',
      'https://ecommercereactphp-production.up.railway.app'
];

// Allow all Netlify subdomains and preview URLs
$isNetlify = preg_match('/^https:\/\/([a-z0-9\-]+\.)?netlify\.app$/', $origin);
$isRailway = str_contains($origin, 'up.railway.app');
$isAllowed = in_array($origin, $allowedOrigins, true) || $isNetlify || $isRailway;

if ($isAllowed || empty($origin)) {
      header("Access-Control-Allow-Origin: " . ($origin ?: $allowedOrigins[0]));
      header("Access-Control-Allow-Credentials: true");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
} else {
      error_log("CORS rejection for origin: $origin");
      http_response_code(403);
      die(json_encode(['error' => 'Origin not allowed']));
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(204);
      exit;
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
// Read GraphQL request
$rawInput = file_get_contents('php://input');
error_log("Raw Input: " . $rawInput);

if (!$rawInput) {
      error_log("Empty request body received");
      http_response_code(400);
      echo json_encode(['error' => 'Empty request body']);
      exit;
}

// Decode JSON input
$input = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE) {
      error_log("JSON Decode Error: " . json_last_error_msg());
      http_response_code(400);
      echo json_encode(['error' => 'Invalid JSON format']);
      exit;
}

error_log("Parsed Input: " . print_r($input, true));

if (!isset($input['query'])) {
      error_log("Missing query field");
      http_response_code(400);
      echo json_encode(['error' => 'Missing GraphQL query']);
      exit;
}

$query = $input['query'] ?? null;
error_log("GraphQL Query: " . ($query ?? 'NULL'));

// Validate the query
if (empty($query)) {
      http_response_code(400); // Bad Request
      echo json_encode(['error' => 'No GraphQL query provided']);
      exit;
}



// Execute GraphQL query
$variableValues = $input['variables'] ?? [];
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
