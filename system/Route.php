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
                    'avatar' => 'https://tr.gravatar.com/avatar/' . md5($user->mail)
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
                    'avatar' => 'https://tr.gravatar.com/avatar/' . md5($user->mail)
        ]);
    })->add(new Validation\Register);
});

$app->group('/pits', function () {
    $this->get('/', function (Request $request, Response $response) {

        $pits = \Model\Pit::with('users')->get();

        $preparedPits = collect();
        $pits->each(function($pit) use($preparedPits) {
            $user = $pit->users->first();
            if ($user) {
                $preparedPits->push([
                    'id' => $pit->id,
                    'left' => $pit->left,
                    'top' => $pit->top,
                    'user' => [
                        'id' => $user->id,
                        'avatar' => $user->avatar,
                    ]
                ]);
            }
        });

        return $response->withJson($preparedPits->toArray());
    });
});

$app->group('/pit', function () {
    $this->get('/{pitID}', function (Request $request, Response $response, $args) {

        $pitID = (int) $args['pitID'];

        $pit = \Model\Pit::with('posts.user')->find($pitID);

        return $response->withJson($pit->toArray());
    });

    $this->post('/', function (Request $request, Response $response, $args) {

        $requestPit = (object) $request->getParam('pit');
        $content = $request->getParam('content');

        if ($requestPit->id) {
            $pit = \Model\Pit::find($requestPit->id);
        } else {
            $pit = new \Model\Pit;
            $pit->left = $requestPit->left;
            $pit->top = $requestPit->top;
            $pit->save();
        }

        $pit->users()->attach(2, [
            'pit_id' => $pit->id,
            'content' => $content
        ]);

        return $response->withJson($pit->toArray());
    });
});
