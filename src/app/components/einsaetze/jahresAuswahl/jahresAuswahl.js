import angular from 'angular';

import controller from './jahresAuswahl.controller';
import template from './jahresAuswahl.template.html';

let jahresAuswahl = angular.module('jahresAuswahl', [])
  .component('jahresAuswahl', {
    template,
    controller,
    bindings: {
      year: '='
    }
  });

export default jahresAuswahl;
