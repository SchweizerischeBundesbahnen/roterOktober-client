/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Angular-Modul der Common-Komponenten
 * - Hier werden alle Security-Komponenten als Modul exportiert
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import angular from 'angular';
import Login from './login/login';
import OAuth from './oauth/oauth';
import Interceptor from './interceptor/interceptor';

let securityModule = angular.module('app.components.authentication', [
    Login.name, OAuth.name, Interceptor.name
]);

export default securityModule;