import angular from 'angular';
import einsatzService from './einsatzService.service.js';

/*@ngInject*/
let einsatzServiceModule = angular.module('einsatzServiceService', [])
    .service('einsatzService', einsatzService);

export default einsatzServiceModule;