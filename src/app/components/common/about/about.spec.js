/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests About
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import AboutModule from './about';
import AboutController from './about.controller';
import AboutTemplate from './about.html';

describe('About', () => {
    let $rootScope, makeController, translateMock;

    beforeEach(window.module(AboutModule.name));
    beforeEach(inject((_$rootScope_, _$log_) => {
        $rootScope = _$rootScope_;

        translateMock = {
            use: function () {
            }
        };

        makeController = () => {
            return new AboutController(translateMock, {
                getAllPosts: function () {
                    return [{
                        postId: 1, title: 'hi 1'
                    }, {
                        postId: 2, title: 'hi 2'
                    }];
                }, getPostById: function () {
                    return {postId: 4, title: 'hi 4'};
                }
            }, _$log_);
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [aboutMessage]', () => {
            let controller = makeController();
            expect(controller.aboutMessage).toBe('Über dieses Template');
        });

        it('has a name property [posts]', () => {
            let controller = makeController();
            expect(controller.posts.length).toBe(2);
            expect(controller.posts[0].title).toBe('hi 1');
            expect(controller.posts[1].title).toBe('hi 2');
        });

        it('has a name property [postById]', () => {
            let controller = makeController();
            expect(controller.postById.title).toBe('hi 4');
        });

        it('to change language with changeLanguage()', () => {
            let controller = makeController();

            spyOn(translateMock, 'use');

            controller.changeLanguage('de');

            expect(translateMock.use).toHaveBeenCalledWith('de');
        });
    });

    describe('Template', () => {
        it('has name in template [aboutMessage]', () => {
            expect(AboutTemplate).toMatch(/{{\s?\$ctrl\.aboutMessage\s?}}/g);
        });
        it('has name in template [posts.length]', () => {
            expect(AboutTemplate).toMatch(/{{\s?\$ctrl\.posts\.length\s?}}/g);
        });
        it('has name in template [vm.posts[0].title]', () => {
            expect(AboutTemplate).toMatch(/{{\s?\$ctrl\.posts\[0\]\.title\s?}}/g);
        });
        it('has name in template [vm.postById.id]', () => {
            expect(AboutTemplate).toMatch(/{{\s?\$ctrl\.postById\.id\s?}}/g);
        });
        it('has name in template [vm.postById.title]', () => {
            expect(AboutTemplate).toMatch(/{{\s?\$ctrl\.postById\.title\s?}}/g);
        });
    });

});