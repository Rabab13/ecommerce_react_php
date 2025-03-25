<?php

use Dotenv\Dotenv;
use App\Database\Database;
use App\GraphQL\Schema;
use GraphQL\GraphQL;

// Autoload dependencies
require_once __DIR__ . '/../vendor/autoload.php';

// Load environment variables
try {
      $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
      $dotenv->load();
      $dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS']);
} catch (Exception $e) {
      header('Content-Type: application/json');
      http_response_code(500);
      die(json_encode(['error' => 'Configuration error', 'details' => $e->getMessage()]));
}

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

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      header("Access-Control-Allow-Origin: " . ($origin ?: $allowedOrigins[0]));
      header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
      if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            header('Content-Type: text/html');
            echo '<html><body><h1>GraphQL API</h1><p>Send POST requests with JSON payload to this endpoint</p></body></html>';
            exit;
      }
      http_response_code(405);
      header('Allow: POST, OPTIONS');
      echo json_encode(['error' => 'Method not allowed. Use POST for GraphQL requests']);
      exit;
}

// Verify content type
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') === false) {
      http_response_code(415);
      echo json_encode(['error' => 'Unsupported Media Type. Use application/json']);
      exit;
}

try {
      // Get DB connection
      $db = Database::getInstance()->getConnection();

      // Create GraphQL schema
      $schema = Schema::create($db);

      // Get input data
      $rawInput = file_get_contents('php://input');
      if (empty($rawInput) && !empty($_POST)) {
            $rawInput = json_encode($_POST);
      }

      if (empty($rawInput)) {
            throw new Exception('Empty request body');
      }

      $input = json_decode($rawInput, true);
      if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON: ' . json_last_error_msg());
      }

      if (empty($input['query'])) {
            throw new Exception('No GraphQL query provided');
      }

      // Execute query
      $result = GraphQL::executeQuery(
            $schema,
            $input['query'],
            null,
            null,
            $input['variables'] ?? null,
            $input['operationName'] ?? null
      );

      $output = $result->toArray();
} catch (Exception $e) {
      $output = [
            'errors' => [
                  [
                        'message' => $e->getMessage(),
                        'extensions' => [
                              'code' => $e->getCode(),
                              'file' => $e->getFile(),
                              'line' => $e->getLine()
                        ]
                  ]
            ]
      ];
      http_response_code(500);
}

// Return response
header('Content-Type: application/json');
echo json_encode($output);
