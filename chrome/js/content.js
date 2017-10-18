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

                    template.get('post/tmpl/pits', function () {

                        api.get('pits', function (pits) {

                            template.append('.linktalker', 'linktalker-pits', {
                                pits: pits
                            });

                            template.get('post/tmpl/posts', function () {
                                $('.linktalker-pit').on('click', function (e) {

                                    $('.linktalker-posts').hide();

                                    var pitID = $(this).attr('id').split('-').pop();
                                    if ($('#linktalker-posts-' + pitID).length) {
                                        return $('#linktalker-posts-' + pitID).show();
                                    }

                                    var top = $(this).css('top').replace('px', '');
                                    var left = $(this).css('left').replace('px', '');
                                    template.append('.linktalker-pits', 'linktalker-posts', {
                                        id: 1,
                                        position: {
                                            top: (Number(top) - 10) + 'px',
                                            left: (Number(left) - 10) + 'px'
                                        },
                                        posts: [{
                                                id: 1,
                                                user: {
                                                    username: 'ismailocal',
                                                    avatar: user.avatar
                                                },
                                                content: 'This is the default welcome page used to test the correct operation of the Apache2 server after installation on Ubuntu systems. It is based on the equivalent page on Debian, from which the Ubuntu Apache packaging is derived.'
                                            }, {
                                                id: 2,
                                                user: {
                                                    username: 'matthomes',
                                                    avatar: 'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mm'
                                                },
                                                content: 'If you are a normal user of this web site and don\'t know what this page is about, this probably means that the site is currently unavailable due to maintenance. If the problem persists, please contact the site\'s administrator.'
                                            }],
                                        user: user
                                    });
                                });
                            });
                        });
                    });

                    template.get('post/tmpl/post-new', function () {
                        $('body').on('click', function (e) {
                            e.preventDefault();

                            $('.linktalker-posts').hide();

                            var linktalkerNew = $('.linktalker').find('.linktalker-new')
                            var linktalkerPostNew = linktalkerNew.find('.linktalker-post-new .linktalker-post-body');
                            var linktalkerPostNewHtml = linktalkerPostNew.text() || '';
                            linktalkerNew.remove();

                            template.append('.linktalker', 'linktalker-post-new', {
                                position: {
                                    top: e.clientY - 30 + 'px',
                                    left: e.clientX - 30 + 'px'
                                },
                                user: user,
                                content: linktalkerPostNewHtml
                            });
                        });

                        $('body').on('click', '.linktalker', function (e) {
                            e.stopPropagation();
                        });
                    });
                });
            });
        });