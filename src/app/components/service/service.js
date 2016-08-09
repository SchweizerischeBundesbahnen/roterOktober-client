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
import MitarbeiterService from './mitarbeiterService/mitarbeiterService';
import EinsatzService from './einsatzService/einsatzService';
import ProjektService from './projektService/projektService';
import PensumService from './pensumService/pensumService';

let serviceModule = angular.module('app.components.service', [
    MitarbeiterService.name, EinsatzService.name, ProjektService.name, PensumService.name
]);

export default serviceModule;