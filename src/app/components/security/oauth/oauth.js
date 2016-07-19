/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der OAuth-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import angular from 'angular';
import oAuthService from './oauth.service';

let oAuthModule = angular.module('oAuth', [])

.service('oAuthService', oAuthService);

export default oAuthModule;