/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Messages-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import angular from 'angular';

import service from './messages.service';

import template from './messages.html';
import controller from './messages.controller';

let messagesModule = angular.module('messages', [])
    .service('messagesService', service)

    .component('messages', {
        template,
        controller
    });

export default messagesModule;