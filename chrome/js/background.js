/**
 * Created by ismailocal on 30.09.2017.
 */

app
        .controller('background')
        .inject('chrome')
        .create(function (chrome) {

            var self = this;
            self.container = $('body');

            chrome.on();

        });