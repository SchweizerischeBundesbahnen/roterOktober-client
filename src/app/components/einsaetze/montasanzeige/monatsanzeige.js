import angular from 'angular';

import template from './montasanzeige.template.html';
import controller from './montasanzeige.controller';

let monatsAnzeigeModul = angular.module('monatsModul', [])
  .component('monatsAnzeige', {
    template,
    controller
  });

export default monatsAnzeigeModul;
