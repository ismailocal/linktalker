'use strict';

app
        .controller('userEvent')
        .extend('event')
        .inject('chrome', 'template', 'api')
        .create(function (chrome, template, api) {

            var self = this;

            self.container = $('#linktalker-container');

            self.on('logged', function (user) {

                chrome.set('user', user);

                template.render(self.container, 'linktalker-profile', {
                    username: 'Hello ' + user.username,
                    avatar: user.avatar
                });

                $('#linktalker-logout').on('click', function (e) {
                    self.emit('logout');
                });
            });

            self.on('login', function (data) {
                template.render(self.container, 'linktalker-login', {});

                $('#linktalker-login-form').submit(function (e) {
                    e.preventDefault();

                    api.post('user/login', $(e.target).serialize(), function (response) {
                        self.emit('logged', response);
                    });

                });

                $('#linktalker-register-link').on('click', function () {
                    self.emit('register');
                });
            });

            self.on('register', function (data) {
                template.render(self.container, 'linktalker-register', {});

                $('#linktalker-register-form').submit(function (e) {
                    e.preventDefault();

                    api.post('user/register', $(e.target).serialize(), function (response) {
                        self.emit('logged', response);
                    });
                });

                $('#linktalker-login-link').on('click', function () {
                    self.emit('login');
                });
            });

            self.on('logout', function (data) {
                chrome.set('user', null);
                self.emit('login');
            });
        });