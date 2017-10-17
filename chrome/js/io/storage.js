/**
 * Created by ismailocal on 30.09.2017.
 */

app
    .controller('storage')
    .inject('console')
    .define(function (console) {
        var self = this;

        self.set = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        };

        self.get = function (key) {
            var value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        };

        self.delete = function (key) {
            localStorage.removeItem(key);
        };
    });