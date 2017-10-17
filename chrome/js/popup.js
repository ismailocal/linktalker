/**
 * Created by ismailocal on 30.09.2017.
 */

app
        .controller('popup')
        .inject('chrome', 'userEvent')
        .create(function (chrome, userEvent) {

            var self = this;

            chrome.get('user', function (user) {
                if (user) {
                    userEvent.emit('logged', user);
                } else {
                    userEvent.emit('login');
                }
            });
        });