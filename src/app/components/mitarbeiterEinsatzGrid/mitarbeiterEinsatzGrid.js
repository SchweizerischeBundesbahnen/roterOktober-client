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
import Mitarbeiter from "./mitarbeiter/mitarbeiter";
import Pensum from './pensum/pensum';
import Einsatz from "./einsatz/einsatz";
import MitarbeiterEdit from "./mitarbeiterEdit/mitarbeiterEdit";
import EinsatzCreate from "./einsatzCreate/einsatzCreate";

let mitarbeiterEinsatzGridModule = angular.module('app.components.mitarbeiterEinsatzGrid', [
    Mitarbeiter.name, Einsatz.name, Pensum.name, MitarbeiterEdit.name, EinsatzCreate.name
]);

export default mitarbeiterEinsatzGridModule;