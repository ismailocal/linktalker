/**
 * Created by ismailocal on 30.09.2017.
 */

app.controller('template').define(function () {
    var self = this;

    self.templates = {};

    self.wrapperTmpl = $('<div/>', {
        class: 'linktalker-tmpls'
    });

    $('body').append(self.wrapperTmpl);

    self.get = function (file, callback) {
        $.get(chrome.extension.getURL('/html/' + file + '.html'), function (html) {
            self.templates[file] = html;
            self.wrapperTmpl.append(self.templates[file]);
            callback();
        });
    };

    self.append = function (place, id, data, callback) {
        $(place).append(tmpl(id, data));
        if (callback) {
            callback();
        }
    };

    self.render = function (file, data, callback) {
        self.get(file, data, function (html) {


            $.each(data, function (key, value) {
                html = html.split('{' + key + '}').join(value);
            });

            var html = self.container.html().split('{' + key + '}').join(self.prepare());

            html = self.prepare($.trim(html), data);
            callback();
        });


        var html = self.container.html().split('{' + key + '}').join(self.prepare());
        if (callback) {
            callback();
        }
        self.container.html(html);
    };

    self.prepare = function (template, data) {
        var html = template.html();

        $.each(data, function (key, value) {

            if (typeof value !== 'object') {
                html = html.split('{' + key + '}').join(value);
            } else {
                self.get(value[0], function (template) {
                    value[1].map(function (value_1) {
                        template.html(self.prepare(template, value_1));
                    });
                });
            }
        });
        console.log(html);
        return html;
    };
});