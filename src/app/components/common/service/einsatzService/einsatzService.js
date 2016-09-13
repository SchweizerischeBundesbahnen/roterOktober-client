import angular from 'angular';
import einsatzService from './einsatzService.service.js';

/*@ngInject*/
let einsatzServiceModule = angular.module('einsatzServiceModule', [])
    .service('einsatzService', einsatzService);

export default einsatzServiceModule;
