/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der OAuth-Interceptor-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.11
 * @since 24.11.2015, 2015.
 */
import angular from 'angular';
import oAuthInterceptorService from './interceptor.service';

let oAuthInterceptorModule = angular.module('oAuthInterceptor', [])

    .service('oAuthInterceptorService', oAuthInterceptorService);

export default oAuthInterceptorModule;
