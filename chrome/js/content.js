/**
 * Created by ismailocal on 30.09.2017.
 */

app
        .controller('content')
        .inject('chrome', 'template', 'event', 'api')
        .create(function (chrome, template, event, api) {

            var self = this;
            self.window = $(window);

//            template.get([
//                'post/tmpl/posts',
//                'post/tmpl/posts-pit',
//            ]);

//                            posts: [{
//                                    user: {
//                                        username: 'ismailocal',
//                                        avatar: user.avatar
//                                    },
//                                    content: 'This is the default welcome page used to test the correct operation of the Apache2 server after installation on Ubuntu systems. It is based on the equivalent page on Debian, from which the Ubuntu Apache packaging is derived.'
//                                }, {
//                                    user: {
//                                        username: 'matthomes',
//                                        avatar: 'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mm'
//                                    },
//                                    content: 'If you are a normal user of this web site and don\'t know what this page is about, this probably means that the site is currently unavailable due to maintenance. If the problem persists, please contact the site\'s administrator.'
//                                }],

            template.get('post/tmpl/linktalker', function () {

                template.append('body', 'linktalker');

                chrome.get('user', function (user) {

                    template.get('post/tmpl/post-new', function () {

                        template.get('post/tmpl/pits', function () {

                            api.get('pits/', function (pits) {

                                template.append('.linktalker', 'linktalker-pits', {
                                    pits: pits
                                });

                                template.get('post/tmpl/posts', function () {
                                    $('.linktalker-pit').on('click', function (e) {

                                        $('.linktalker-posts').hide();

                                        var pitID = $(this).attr('data-pit-id');

                                        if ($('.linktalker-posts[data-pit-id="' + pitID + '"]').length) {
                                            return $('.linktalker-posts[data-pit-id="' + pitID + '"]').show();
                                        }

                                        api.get('pit/' + pitID, function (pit) {
                                            self.pit = {
                                                id: pit.id,
                                                top: pit.top,
                                                left: pit.left,
                                            };
                                            template.append('.linktalker-pits', 'linktalker-posts', {
                                                pit: pit,
                                                user: user,
                                                content: ''
                                            });
                                        });
                                    });
                                });
                            });
                        });

                        $('body').on('click', function (e) {
                            if ($(e.target).closest('.linktalker').length > 0) {
                                if ($(e.target).hasClass('linktalker-submit-button')) {
                                    var pit = $(e.target).attr('data-pit');
                                    if (!pit === 'true') {
                                        var linktalkerNew = $(e.target).closest('.linktalker-new');
                                    }
                                    var linktalkerPostNew = $(e.target).closest('.linktalker-post-new');

                                    var content = linktalkerPostNew.find('.linktalker-post-body').text();
                                    api.post('pit/' + self.pit.id, {
                                        pit: self.pit,
                                        content: content,
                                        token: user.token
                                    }, function (pit) {

                                    });
                                }
                                return false;
                            }
                            e.preventDefault();

                            $('.linktalker-posts').hide();

                            var linktalkerNew = $('.linktalker').find('.linktalker-new')
                            var linktalkerPostNew = linktalkerNew.find('.linktalker-post-new .linktalker-post-body');
                            var linktalkerPostNewHtml = linktalkerPostNew.text() || '';
                            linktalkerNew.remove();

                            self.pit = {
                                id: '',
                                top: e.clientY - 30,
                                left: e.clientX - 30
                            };

                            template.append('.linktalker', 'linktalker-post-new', {
                                pit: self.pit,
                                user: user,
                                content: linktalkerPostNewHtml
                            });
                        });
                    });
                });
            });
        });