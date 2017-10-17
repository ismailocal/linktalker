<?php

/**
 * Created by PhpStorm.
 * User: ismailocal
 * Date: 1.10.2017
 * Time: 12:24
 */
namespace Validation;

use Respect\Validation\Validator;
use DavidePastore\Slim\Validation\Validation;

class Register extends \Validation\Validation
{
    public function __invoke($request, $response, $next)
    {
        return $this->exec(new Validation([
            'username' => Validator::alnum()->noWhitespace()->length(4, 100),
            'mail' => Validator::email(),
            'password' => Validator::alnum()->noWhitespace()->length(4, 100)
        ]), $request, $response, $next);
    }
}