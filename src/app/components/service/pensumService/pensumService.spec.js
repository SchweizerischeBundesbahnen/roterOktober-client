import PensumServiceModule from './pensumService';

import PensumServiceService from './pensumService.service.js';

describe('PensumServiceService', () => {
    let $rootScope, makeService;

    beforeEach(window.module(PensumServiceModule.name));
    beforeEach(inject((_$rootScope_) => {

        $rootScope = _$rootScope_;
        makeService = () => {
            return new PensumServiceService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // service specs
    });
});