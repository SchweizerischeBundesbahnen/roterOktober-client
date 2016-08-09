import angular from 'angular';
import pensumService from './pensumService.service.js';

/*@ngInject*/
let pensumServiceModule = angular.module('pensumService', [])
    .service('pensumService', pensumService);

export default pensumServiceModule;