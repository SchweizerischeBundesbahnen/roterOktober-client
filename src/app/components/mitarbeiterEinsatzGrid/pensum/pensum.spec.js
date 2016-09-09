import PensumModule from './pensum';
import PensumController from './pensum.controller.js';
import PensumTemplate from './pensum.html';

describe('Pensum', () => {
    let $rootScope, makeController;

    beforeEach(window.module(PensumModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new PensumController();
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
