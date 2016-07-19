/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Theme-Komponente.
 *
 * @author u202666 (Jonas Graber)
 * @version: 0.0.1
 * @since 10.12.2015, 2015.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './theme.html';
import controller from './theme.controller';

let themeModule = angular.module('theme', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('theme', {
            url: '/theme', template: '<theme></theme>'
        });
    })

    .component('theme', {
        template,
        controller
    });

export default themeModule;