import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './mitarbeiterEinsatz.template.html';
import controller from './mitarbeiterEinsatz.controller';
import jahresAuswahlModule from './jahresAuswahl/jahresAuswahl';
import zeitachseModule from './zeitachse/zeitachse';
import monatsAnzeigeModul from './montasanzeige/monatsanzeige';

import styles from './mitarbeiterEinsatz.style.css';

let mitarbeiterEinsatz = angular.module('mitarbeiterEinsatz', [jahresAuswahlModule.name,
  zeitachseModule.name, monatsAnzeigeModul.name])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
      $stateProvider.state('einsaetze', {
        url: '/', template: '<einsaetze></einsaetze>'
      });
    })
    .component('einsaetze', {
        template,
        controller
    })

export default mitarbeiterEinsatz;
