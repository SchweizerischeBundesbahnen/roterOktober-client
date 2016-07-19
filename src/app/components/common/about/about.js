/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der About-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './about.html';
import controller from './about.controller';
import './about.css';

let aboutModule = angular.module('about', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider) => {
        $stateProvider.state('about', {
            url: '/about', template: '<about></about>'
        });
    })

    .component('about', {
        template,
        controller
    });

export default aboutModule;