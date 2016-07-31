import ProjektServiceModule from './projektService';

import ProjektServiceService from './projektService.service.js';

describe('ProjektServiceService', () => {
    let $rootScope, makeService;

    beforeEach(window.module(ProjektServiceModule.name));
    beforeEach(inject((_$rootScope_) => {

        $rootScope = _$rootScope_;
        makeService = () => {
            return new ProjektServiceService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // service specs
    });
});