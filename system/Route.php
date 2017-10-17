<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

// Routes


$app->group('/user', function () {
    $this->post('/login', function (Request $request, Response $response) {

        $username = $request->getParam('username');
        $password = $request->getParam('password');

        $user = \Model\User::where('username', $username)
            ->orWhere('mail', $username)
            ->first();

        if (!$user) {
            return $response->withJson([
                'error' => 'danger',
                'messages' => [
                    'Kullanıcı bulunamadı!'
                ]
            ]);
        }

        if ($user->password !== $password) {
            return $response->withJson([
                'error' => 'danger',
                'messages' => [
                    'Kullanıcı bilgileri hatalı!'
                ]
            ]);
        }

        return $response->withJson([
            'username' => $user->username,
            'token' => $user->token,
            'avatar' => '<img src="https://tr.gravatar.com/avatar/' . md5($user->mail) . '"></img>'
        ]);
    })->add(new Validation\Login);

    $this->post('/register', function (Request $request, Response $response) {

        $username = $request->getParam('username');
        $mail = $request->getParam('mail');
        $password = $request->getParam('password');


        $user = \Model\User::where('username', $username)
            ->orWhere('mail', $mail)
            ->first();

        if ($user) {
            return $response->withJson([
                'error' => 'danger',
                'messages' => [
                    'Kullanıcı adı ya da mail adresi sistemde zaten var!'
                ]
            ]);
        }

        $user = new \Model\User;
        $user->username = $username;
        $user->mail = $mail;
        $user->password = $password;
        $user->save();

        $user->token = JWT::encode([
            'id' => $user->id,
            'username' => $user->username
        ], $this->settings['jwt']['key']);
        $user->save();

        return $response->withJson([
            'username' => $user->username,
            'token' => $user->token,
            'avatar' => '<img src="https://tr.gravatar.com/avatar/' . md5($user->mail) . '"></img>'
        ]);
    })->add(new Validation\Register);
});