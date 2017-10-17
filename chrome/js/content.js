/**
 * Created by ismailocal on 30.09.2017.
 */

app
        .controller('content')
        .inject('chrome', 'template', 'event', 'api')
        .create(function (chrome, template, event, api) {

            var self = this;
            self.window = $(window);

            template.gets([
                'post/tmpl/posts',
//                'post/post'
            ]);

            chrome.get('user', function (user) {

                self.window.on('click', function (e) {
                    e.preventDefault();

                    var linktalkerNew = $('body').find('.linktalker-new')
                    var linktalkerPostNew = linktalkerNew.find('.linktalker-post-new .linktalker-post-body');
                    var linktalkerPostNewHtml = linktalkerPostNew.text() || '';
                    linktalkerNew.remove();

                    template.append('body', 'linktalker-posts', {
                        new: true,
                        top: e.clientY - 30 + 'px',
                        left: e.clientX - 30 + 'px',
                        posts: [{
                                user: {
                                    username: 'ismailocal',
                                    avatar: user.avatar
                                },
                                content: 'This is the default welcome page used to test the correct operation of the Apache2 server after installation on Ubuntu systems. It is based on the equivalent page on Debian, from which the Ubuntu Apache packaging is derived.'
                            },{
                                user: {
                                    username: 'matthomes',
                                    avatar: 'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mm'
                                },
                                content: 'If you are a normal user of this web site and don\'t know what this page is about, this probably means that the site is currently unavailable due to maintenance. If the problem persists, please contact the site\'s administrator.'
                            }],
                        user: user,
                        content: linktalkerPostNewHtml
                    });

                    $('body').find('.linktalker').off('click').on('click', function (e) {
                        e.stopPropagation();
                    });

//                    template.get('post/posts', function (html) {
//                        template.append($('body'), html, {
//                            top: e.clientY - 24 + 'px',
//                            left: e.clientX + 44 + 'px'
//                        });
//
//                        template.get('post/post', function (html) {
//                            posts = posts.map(function (post) {
//                                return template.prepare(html, post);
//                            });
//
//                            template.render(self.container, 'posts', posts.join(''));
//                        });
//
//                        $('body').find('.linktalker').off('click').on('click', function (e) {
//                            e.stopPropagation();
//                        });
//                    });



//                        template.append(self.container, html, {
//                            top: e.clientY - 24 + 'px',
//                            left: e.clientX + 44 + 'px',
//                            avatar: user.avatar,
//                            post: linktalkerPostNewHtml
//                        });

                });
            });
        });