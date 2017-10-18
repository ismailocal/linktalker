/**
 * Created by ismailocal on 30.09.2017.
 */

app.controller('api')
        .inject('config', 'commonEvent', 'loading')
        .define(function (config, commonEvent, loading) {
            var self = this;

            loading.position($('.linktalker'));

            self.get = function (url, success, error) {
                loading.start();
                $.get(config.apiUrl + url +'/', function (response) {
                    if (response.error) {
                        commonEvent.emit('notice', response);
                    } else {
                        success(response);
                    }
                    loading.stop();
                }, 'json').fail(function (response) {
                    commonEvent.emit('notice', 'Sunucu ile bağlantı sağlanamadı!');
                    loading.stop();
                });
            };

            self.post = function (url, data, success, error) {
                loading.start();
                $.post(config.apiUrl + url, data, function (response) {
                    if (response.error) {
                        commonEvent.emit('notice', response);
                    } else {
                        success(response);
                    }
                    loading.stop();
                }, 'json').fail(function (response) {
                    commonEvent.emit('notice', 'Sunucu ile bağlantı sağlanamadı!');
                    loading.stop();
                });
            };
        });