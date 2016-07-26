/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests Navbar
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import NavbarModule from './navbar';
import NavbarController from './navbar.controller';
import NavbarTemplate from './navbar.html';

describe('Navbar', () => {
    let $rootScope, makeController;

    beforeEach(window.module(NavbarModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new NavbarController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [name]', () => {
            let controller = makeController();
            expect(controller.name).toBe('navbar');
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has "Home" in template', () => {
            expect(NavbarTemplate).toMatch(/Home/g);
        });
        it('has "About" in template', () => {
            expect(NavbarTemplate).toMatch(/About/g);
        });
    });

});