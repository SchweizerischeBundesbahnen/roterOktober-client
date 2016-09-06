import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './mitarbeiterEinsatz.template.html';
import controller from './mitarbeiterEinsatz.controller';
import mitarbeiterServiceModule from './service/mitarbeiterService/mitarbeiterService';
import einsatzServiceModule from './service/einsatzService/einsatzService';
import jahresAuswahlModule from './jahresAuswahl/jahresAuswahl';
import zeitachseModule from './zeitachse/zeitachse';

let mitarbeiterEinsatz = angular.module('mitarbeiterEinsatz', [mitarbeiterServiceModule.name,
  einsatzServiceModule.name, jahresAuswahlModule.name, zeitachseModule.name])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
      $stateProvider.state('mitarbeiterEinsatz', {
        url: '/', template: '<mitarbeiter-einsatz></mitarbeiter-einsatz>'
      });
    })
    .component('mitarbeiterEinsatz', {
        template,
        controller
    })

export default mitarbeiterEinsatz;
