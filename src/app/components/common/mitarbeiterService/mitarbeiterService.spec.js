import MitarbeiterServiceModule from './mitarbeiterService';

import MitarbeiterServiceService from './mitarbeiterService.service.js';

describe('MitarbeiterServiceService', () => {
    let $rootScope, makeService;

    beforeEach(window.module(MitarbeiterServiceModule.name));
    beforeEach(inject((_$rootScope_) => {

        $rootScope = _$rootScope_;
        makeService = () => {
            return new MitarbeiterServiceService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // service specs
    });
});