import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './einsaetze.html';
import controller from './einsaetze.controller';
import jahresAuswahlModule from './jahresAuswahl/jahresAuswahl';
import zeitachseModule from './zeitachse/zeitachse';
import monatsAnzeigeModul from './montasanzeige/monatsanzeige';

import styles from './einsaetze.css';

let einsaetze = angular.module('einsaetze', [jahresAuswahlModule.name,
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

export default einsaetze;
