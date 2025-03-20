<?php

require_once __DIR__ . '/../bootstrap.php'; // Autoload and DB setup

use App\Seeders\DatabaseSeeder;

$seeder = new DatabaseSeeder();
$seeder->run();
