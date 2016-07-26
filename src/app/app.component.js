/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Hauptkomponente der Angular-Applikation
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import template from './app.html';
import './app.css';

let appComponent = () => {
    return {
        template, restrict: 'E'
    };
};

export default appComponent;