import angular from 'angular';

import template from './einsatzCreate.html';
import controller from './einsatzCreate.controller.js';

let einsatzCreateModule = angular.module('einsatzCreate', [])
    .component('einsatzCreate', {
        template,
        controller
    });

export default einsatzCreateModule;