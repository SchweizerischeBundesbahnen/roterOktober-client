/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Angular-Modul der Common-Komponenten
 * - Hier werden alle Common-Komponenten als Modul exportiert
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import angular from "angular";
import ProjektService from './projektService/projektService';
import PensumService from './pensumService/pensumService';
import mitarbeiterServiceModule from './mitarbeiterService/mitarbeiterService';
import einsatzServiceModule from './einsatzService/einsatzService';
import storageService from './storageService/storageService';

let serviceModule = angular.module('app.components.service', [
    ProjektService.name, PensumService.name, mitarbeiterServiceModule.name,
    einsatzServiceModule.name, storageService.name
]);

export default serviceModule;
