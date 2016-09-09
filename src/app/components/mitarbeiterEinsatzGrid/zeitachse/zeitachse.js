import angular from 'angular';

import template from './zeitachse.template.html';
import controller from './zeitachse.controller';
import styles from './zeitachse.style.css';

let zeitachseModule = angular.module('zeitachseModul', [])
  .component('zeitachse', {
    template,
    controller,
    bindings: {
      pensum: '<',
      selectedYear: '<',
      rowIndex: '<'
    }
  });

export default zeitachseModule;
