import angular from 'angular';

import template from './pensum.html';
import controller from './pensum.controller.js';

let pensumModule = angular.module('pensum', [])
    .component('pensum', {
        template,
        controller,
        bindings: {
            einsatz: '='
        }

    });

export default pensumModule;