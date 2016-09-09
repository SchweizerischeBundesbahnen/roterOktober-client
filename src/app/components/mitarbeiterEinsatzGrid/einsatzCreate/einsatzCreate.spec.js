import EinsatzCreateModule from './einsatzCreate';
import EinsatzCreateController from './einsatzCreate.controller.js';
import EinsatzCreateTemplate from './einsatzCreate.html';

describe('EinsatzCreate', () => {
    let $rootScope, makeController;

    beforeEach(window.module(EinsatzCreateModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new EinsatzCreateController();
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
