/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests PostsService
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import 'angular-resource';
import PostsModule from './posts';
import PostsService from './posts.service';

describe('PostsService', () => {
    let $rootScope, makeService, $httpBackend;

    beforeEach(window.module(PostsModule.name));
    beforeEach(inject((_$rootScope_, _$resource_, _$httpBackend_) => {

        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        makeService = () => {
            return new PostsService(_$resource_);
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        it('has a resource-property [Posts]', () => {

            let service = makeService();
            expect(service.Posts).not.toBeNull();
        });

        it('should load all posts when getAllPosts() is called', () => {

            $httpBackend.expect('GET', 'http://jsonplaceholder.typicode.com/posts').respond(200,
                [{title: 'Test', id: 1}, {title: 'Test 2', id: 2}], 'success');

            let service = makeService();
            let posts = service.getAllPosts();
            $httpBackend.flush();
            expect(posts.length).toBe(2);
        });
        it('should load defined post when getAllPosts() is called', () => {

            $httpBackend.expect('GET', 'http://jsonplaceholder.typicode.com/posts/2').respond(200,
                {title: 'Test 2', id: 2}, 'success');

            let service = makeService();
            let post = service.getPostById(2);
            $httpBackend.flush();
            expect(post.id).toBe(2);
        });
    });
});