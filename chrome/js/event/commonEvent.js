'use strict';

app
        .controller('commonEvent')
        .extend('event')
        .inject('template')
        .create(function (template) {

            var self = this;

            self.container = $('#linktalker-container');

            self.on('notice', function (notice) {
                template.render(self.container.find('.linktalker-form-notice'), 'linktalker-notice', {
                    messages: notice.messages ? notice.messages.map(function (message) {
                        return '<div class="linktalker-notice-line linktalker-notice-' + notice.error + '">' + message + '</div>';
                    }).join('') : null
                });
            });
        });