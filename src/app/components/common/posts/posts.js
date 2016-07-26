/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition des NewsfetcherService-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import angular from 'angular';
import postsService from './posts.service';

/*@ngInject*/
let postsModule = angular.module('postsService', ['ngResource'])

.service('postsService', postsService);

export default postsModule;