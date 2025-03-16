<?php

namespace App\Config;

class Config
{
      public function getDatabaseConfig()
      {
            return [
                  'host' => 'db',
                  'dbname' => 'scandiweb_ecommerce',
                  'user' => 'root',
                  'password' => 'root',
            ];
      }
}
