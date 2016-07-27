import MitarbeiterModule from './mitarbeiter';
import MitarbeiterController from './mitarbeiter.controller.js';
import MitarbeiterTemplate from './mitarbeiter.html';

describe('Mitarbeiter', () => {
    let $rootScope, makeController;

    beforeEach(window.module(MitarbeiterModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new MitarbeiterController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [content]', () => {
            let controller = makeController();
            expect(controller.content).toBe('Hello, Mitarbeiter');
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has template', () => {
            expect(MitarbeiterTemplate).length > 0;
        });
    });

});