import EinsatzModule from './einsatz';
import EinsatzController from './einsatz.controller.js';
import EinsatzTemplate from './einsatz.html';

describe('Einsatz', () => {
    let $rootScope, makeController;

    beforeEach(window.module(EinsatzModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new EinsatzController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [content]', () => {
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has template', () => {
        });
    });

});
