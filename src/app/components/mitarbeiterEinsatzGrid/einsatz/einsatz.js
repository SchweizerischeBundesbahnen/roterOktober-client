import angular from 'angular';

import template from './einsatz.html';
import controller from './einsatz.controller.js';

let einsatzModule = angular.module('einsatz', [])
    .component('einsatz', {
        template,
        controller,
        bindings: {
            mitarbeiter: '='
        }
    });

export default einsatzModule;