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

// Get request method
$requestMethod = $_SERVER['REQUEST_METHOD'];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

// Handle preflight requests first
if ($requestMethod === 'OPTIONS') {
      header("Access-Control-Allow-Origin: " . ($origin ?: $allowedOrigins[0]));
      header("Access-Control-Allow-Methods: POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
      header("Access-Control-Allow-Credentials: true");
      header("Access-Control-Max-Age: 86400");
      http_response_code(204);
      exit;
}

// Set CORS headers for actual requests
if ($isAllowed || empty($origin)) {
      header("Access-Control-Allow-Origin: " . ($origin ?: $allowedOrigins[0]));
      header("Access-Control-Allow-Credentials: true");
} else {
      error_log("CORS rejection for origin: $origin");
      http_response_code(403);
      die(json_encode(['error' => 'Origin not allowed']));
}

// Only process POST requests for GraphQL
if ($requestMethod !== 'POST' && $requestMethod !== 'OPTIONS') {
      // Allow GET requests for GraphiQL or other tools if needed
      if ($requestMethod === 'GET') {
            // You could return a simple message or GraphiQL interface here
            header('Content-Type: text/html');
            echo '<html><body><h1>GraphQL API</h1><p>Send POST requests to this endpoint</p></body></html>';
            exit;
      }
      http_response_code(405);
      header('Allow: POST, OPTIONS');
      echo json_encode(['error' => 'Method not allowed. Use POST for GraphQL requests']);
      exit;
}

// Verify content type for POST requests
if ($requestMethod === 'POST' && strpos($contentType, 'application/json') === false) {
      http_response_code(415);
      echo json_encode(['error' => 'Unsupported Media Type. Use application/json']);
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
$rawInput = file_get_contents('php://input');
error_log("Raw Input: " . $rawInput);

// Fallback to $_POST if empty (for form-data)
if (empty($rawInput) && !empty($_POST)) {
      $rawInput = json_encode($_POST);
}

if (empty($rawInput)) {
      error_log("Empty request body received. Headers: " . print_r(getallheaders(), true));
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
      http_response_code(400);
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
