import angular from 'angular';
import projektService from './projektService.service.js';

/*@ngInject*/
let projektServiceModule = angular.module('projektServiceService', [])
    .service('projektService', projektService);

export default projektServiceModule;