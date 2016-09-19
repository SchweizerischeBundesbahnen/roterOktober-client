import angular from 'angular';

import template from './mitarbeiterEdit.html';
import controller from './mitarbeiterEdit.controller.js';

let mitarbeiterEditModule = angular.module('mitarbeiterEdit', [])
    .component('mitarbeiterEdit', {
        template,
        controller
    });

export default mitarbeiterEditModule;