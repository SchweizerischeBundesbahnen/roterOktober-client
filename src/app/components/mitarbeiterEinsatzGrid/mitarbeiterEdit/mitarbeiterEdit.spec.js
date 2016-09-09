import MitarbeiterEditModule from './mitarbeiterEdit';
import MitarbeiterEditController from './mitarbeiterEdit.controller.js';
import MitarbeiterEditTemplate from './mitarbeiterEdit.html';

describe('MitarbeiterEdit', () => {
    let $rootScope, makeController;

    beforeEach(window.module(MitarbeiterEditModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new MitarbeiterEditController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [content]', () => {
            let controller = makeController();
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has template', () => {
        });
    });

});
