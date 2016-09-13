import angular from 'angular';

import template from './zeitachse.template.html';
import controller from './zeitachse.controller';
import styles from './zeitachse.style.css';
import timeaxisCalculatorModule from './service/timeaxisCalculator/timeaxisCalculator';
import pensumConverterModule from './service/pensumConverter/pensumConverter';

let zeitachseModule = angular.module('zeitachseModul', [timeaxisCalculatorModule.name,
  pensumConverterModule.name])
  .component('zeitachse', {
    template,
    controller,
    bindings: {
      pensum: '<',
      selectedYear: '<',
      rowIndex: '<',
      color: '<'
    }
  });

export default zeitachseModule;
