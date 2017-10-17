"use strict";

app.controller('loading').define(function (options) {

    var self = this;

    self.options = options || {};

    self.loadingClass = 'linktalker-loading-bar';

    self.html = [];
    self.html.push('<div class="'+ self.loadingClass +'">');
    self.html.push('<div class="spinner-donut"></div>');
    self.html.push('</div>');
    self.html = self.html.join('');

    self.position = function (position) {
        position.css({'position': 'relative'});
        self.options.position = position;
        return self;
    };

    self.start = function () {
        self.options.position.append(self.html);
        return self;
    };

    self.stop = function () {
        self.options.position.find('.'+ self.loadingClass).remove();
        return self;
    };
});