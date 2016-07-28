import angular from 'angular';
import mitarbeiterService from './mitarbeiterService.service.js';

/*@ngInject*/
let mitarbeiterServiceModule = angular.module('mitarbeiterService', ['ngResource'])
    .service('mitarbeiterService', mitarbeiterService);

export default mitarbeiterServiceModule;