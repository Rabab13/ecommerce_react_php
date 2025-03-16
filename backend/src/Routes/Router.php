<?php

// src/Routes/Router.php
namespace App\Routes;

use FastRoute\RouteCollector;
use FastRoute\Dispatcher\GroupCountBased;
use App\Controllers\GraphQLController;

class Router
{
      private $dispatcher;

      public function __construct()
      {
            $this->dispatcher = \FastRoute\simpleDispatcher(function (RouteCollector $r) {
                  $r->post('/graphql', [GraphQLController::class, 'handle']);
            });
      }

      public function dispatch($method, $uri)
      {
            $routeInfo = $this->dispatcher->dispatch($method, $uri);
            switch ($routeInfo[0]) {
                  case GroupCountBased::NOT_FOUND:
                        http_response_code(404);
                        echo "404 Not Found";
                        break;
                  case GroupCountBased::METHOD_NOT_ALLOWED:
                        $allowedMethods = $routeInfo[1];
                        http_response_code(405);
                        echo "405 Method Not Allowed";
                        break;
                  case GroupCountBased::FOUND:
                        $handler = $routeInfo[1];
                        $vars = $routeInfo[2];
                        echo call_user_func_array($handler, $vars);
                        break;
            }
      }
}
