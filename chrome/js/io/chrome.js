/**
 * Created by ismailocal on 30.09.2017.
 */

app
        .controller('chrome')
        .inject('storage')
        .define(function (storage) {

            var self = this;

            self.tab = function (key, value, callback) {

                var data = {};
                data[key] = value;

                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, data, function (response) {
                        if (callback) {
                            callback(response);
                        }
                    });
                });

                return self;
            };

            self.set = function (key, value, callback) {

                var data = {};
                data[key] = value;

                chrome.runtime.sendMessage(data, function (response) {
                    if (callback) {
                        callback(response);
                    }
                });

                return self;
            };

            self.get = function (key, callback) {
                chrome.runtime.sendMessage(key, function (response) {
                    if (callback) {
                        callback(response);
                    }
                });

                return self;
            };

            self.on = function (callback) {
                chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                    if (typeof request === 'object') {
                        console.log(request);
                        Object.keys(request).map(function (key) {
                            storage.set(key, request[key]);
                        });
                    } else {
                        sendResponse(storage.get(request));
                    }

                    if (callback) {
                        callback(request);
                    }
                });

                return self;
            };
        });