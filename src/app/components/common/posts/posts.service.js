/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
class PostsService {
    /*@ngInject*/
    constructor($resource) {
        this.Posts = $resource('http://jsonplaceholder.typicode.com/posts/:postId', {postId: '@id'});
    }

    /**
     * Liefert alle Posts der REST-Resource zurueck
     * @returns {angular.resource.IResourceArray<T>}
     */
    getAllPosts() {
        return this.Posts.query();
    }

    /**
     * Liefert einen bestimmten Post von der REST-Resource zurueck
     * @param id Die zu suchende PostId
     * @returns {*} Den Post als Objekt
     */
    getPostById(id) {
        return this.Posts.get({postId: id});
    }
}

export default PostsService;