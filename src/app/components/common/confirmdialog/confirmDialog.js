/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */

import angular from 'angular';

import template from './confirmDialog.html';
import controller from './confirmDialog.controller.js';

let confirmDialogModule = angular.module('confirmDialog', [])
    .component('confirmDialog', {
        template,
        controller
    });

export default confirmDialogModule;