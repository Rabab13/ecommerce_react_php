<?php

use Dotenv\Dotenv;
use App\Database\Database;
use App\GraphQL\Schema;
use GraphQL\GraphQL;

// Autoload dependencies
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
      echo json_encode(['error' => 'Origin not allowed']);
      exit;
}

// Handle different endpoints
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Redirect root path to GraphQL endpoint
if ($requestUri === '/' || $requestUri === '/index.html') {
      header('Location: /graphql', true, 301);
      exit;
}

// Handle GraphQL endpoint
if ($requestUri === '/graphql') {
      // Only allow POST requests for GraphQL
      if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

      // Load dependencies
      require_once __DIR__ . '/../src/Database/Database.php';
      require_once __DIR__ . '/../src/GraphQL/Schema.php';

      // Get database connection
      try {
            $db = Database::getInstance()->getConnection();
      } catch (Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit;
      }

      // Read GraphQL request body
      $rawInput = file_get_contents('php://input');
      error_log("Raw Input: " . $rawInput);

      if (empty($rawInput)) {
            http_response_code(400);
            echo json_encode(['error' => 'Empty request body']);
            exit;
      }

      $input = json_decode($rawInput, true);
      if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON format']);
            exit;
      }

      if (!isset($input['query'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing GraphQL query']);
            exit;
      }

      $query = $input['query'];
      $variables = $input['variables'] ?? [];

      // Execute GraphQL query
      try {
            $schema = Schema::create($db);
            $result = GraphQL::executeQuery($schema, $query, null, null, $variables);
            $output = $result->toArray();
      } catch (Exception $e) {
            http_response_code(500);
            $output = [
                  'errors' => [['message' => $e->getMessage()]]
            ];
      }

      // Output response
      header('Content-Type: application/json');
      echo json_encode($output);
      exit;
}

// Handle all other routes
http_response_code(404);
echo json_encode(['error' => 'Not Found']);
