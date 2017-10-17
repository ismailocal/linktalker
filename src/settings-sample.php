<?php

error_reporting(-1);
ini_set('display_errors', 1);

return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Twig settings
        'twig' => [
            'template' => __DIR__ . '/../templates/',
            'cache' => __DIR__ . '/../cache/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        // Eloquent
        'db' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'database' => 'linktalker',
            'username' => 'root',
            'password' => '1234',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],

        // JWT
        'jwt' => [
            'key' => 'linkTalker'
        ]
    ],
];
