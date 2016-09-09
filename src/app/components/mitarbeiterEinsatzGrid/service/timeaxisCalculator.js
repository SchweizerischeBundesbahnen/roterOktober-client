import angular from 'angular';

import TimeaxisCalculatorService from './timeaxisCalculator.service';

let timeaxisCalculatorModule = angular.module('TimeaxisCalculatorModule', [])
  .service('timeaxisCalculatorService', TimeaxisCalculatorService);

export default timeaxisCalculatorModule;
