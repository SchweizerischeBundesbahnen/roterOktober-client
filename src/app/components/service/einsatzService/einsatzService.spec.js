import EinsatzServiceModule from './einsatzService';

import EinsatzServiceService from './einsatzService.service.js';

describe('EinsatzServiceService', () => {
    let $rootScope, makeService;

    beforeEach(window.module(EinsatzServiceModule.name));
    beforeEach(inject((_$rootScope_) => {

        $rootScope = _$rootScope_;
        makeService = () => {
            return new EinsatzServiceService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // service specs
    });
});