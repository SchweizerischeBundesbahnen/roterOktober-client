import angular from 'angular';
import projektService from './projektService.service.js';

/*@ngInject*/
let projektServiceModule = angular.module('projektService', [])
    .service('projektService', projektService);

export default projektServiceModule;