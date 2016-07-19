/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests Theme.
 *
 * @author u202666 (Jonas Graber)
 * @version: 0.0.1
 * @since 10.12.2015, 2015.
 */
import ThemeModule from './theme';
import ThemeController from './theme.controller';
import ThemeTemplate from './theme.html';

describe('Theme', () => {
    let $rootScope, makeController;

    beforeEach(window.module(ThemeModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new ThemeController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
    });

    describe('Template', () => {
    });

});