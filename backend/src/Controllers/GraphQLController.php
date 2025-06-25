<?php

namespace App\Controllers;

use GraphQL\GraphQL as GraphQLBase;
use RuntimeException;
use Throwable;
use App\Database\Database;
use App\GraphQL\Schema;

class GraphQLController
{
    public static function handle(): void
    {
        try {
            // Establish a database connection
            $db = (new Database())->getConnection();
            error_log("Database connection established."); // Log the connection

            // Create a new GraphQL schema
            $schema = Schema::create($db);

            // Get the raw input
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
            $input = json_decode($rawInput, true);
            if (!isset($input['query'])) {
                throw new RuntimeException('Missing "query" key in the request body.');
            }
            error_log(print_r($schema->getQueryType()->getFields(), true));
            error_log("GraphQL query: " . $input['query']); // Log the query
            error_log("GraphQL variables: " . json_encode($input['variables'] ?? null)); // Log the variables

            // Parse the GraphQL query
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            // Execute the GraphQL query
            $rootValue = [];
            $context = ['db' => $db];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, $context, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                        'trace' => $e->getTrace(),
                    ],
                ],
            ];
        }
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }
}
