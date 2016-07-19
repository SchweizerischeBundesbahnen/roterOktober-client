/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Home-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './home.html';
import controller from './home.controller';

let homeModule = angular.module('home', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/', template: '<home></home>'
        });
    })

    .component('home', {
        template,
        controller
    });

export default homeModule;
