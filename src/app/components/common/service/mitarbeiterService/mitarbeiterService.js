import angular from 'angular';
import mitarbeiterService from './mitarbeiterService.service';

/*@ngInject*/
let MitarbeiterServiceModule = angular.module('mitarbeiterService', ['ngResource'])
    .service('mitarbeiterService', mitarbeiterService);

export default MitarbeiterServiceModule;
