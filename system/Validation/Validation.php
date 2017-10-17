<?php
/**
 * Created by PhpStorm.
 * User: ismailocal
 * Date: 1.10.2017
 * Time: 12:38
 */

namespace Validation;

class Validation
{
    public function response($request)
    {
        $messages = collect([]);
        collect($request->getAttribute('errors'))->each(function ($errors) use ($messages) {
            collect($errors)->map(function ($error) use ($messages) {
                $messages[] = $error;
            });
        });

        return [
            'error' => 'danger',
            'messages' => $messages
        ];
    }

    public function exec($validation, $request, $response, $next)
    {
        return $validation($request, $response, function ($request, $response) use($next) {
            if ($request->getAttribute('has_errors')) {
                return $response->withJson($this->response($request));
            }
            return $next($request, $response);
        });
    }
}