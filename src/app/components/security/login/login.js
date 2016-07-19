/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Login-Komponente.
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

let loginModule = angular.module('login', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider) => {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: ['oAuthService', (oAuthService) => {
                    oAuthService.login();
                }]
            })
            .state('logout', {
                url: '/logout',
                controller: ['oAuthService', (oAuthService) => {
                    oAuthService.logout();
                }]
            })
            .state('logincallback', {
                url: '/logincallback{oauth:.*}',
                controller: ['oAuthService', '$stateParams', (oAuthService, $stateParams) => {
                    oAuthService.handleCallback($stateParams.oauth);
                }]
            });
    });

export default loginModule;