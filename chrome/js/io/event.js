"use strict";

app.controller('event').create(function () {

    var self = this;

    self.events = {};

    self.emit = function (key, data) {
	self.events[key](data);
    };

    self.on = function (key, callable) {
	self.events[key] = callable;
    };

    self.off = function (key) {
	delete self.events[key];
    };

});