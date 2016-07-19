/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests OAuthInterceptorService
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.11
 * @since 24.11.2015, 2015.
 */
import OAuthInterceptorModule from './interceptor';
import OAuthInterceptorService from './interceptor.service';

describe('OAuthInterceptorService', () => {
    let $rootScope, makeService, $location;

    beforeEach(window.module(OAuthInterceptorModule.name));
    beforeEach(inject((_$rootScope_,
                       _$location_, _$q_) => {

        $rootScope = _$rootScope_;
        $location = _$location_;

        makeService = () => {
            return new OAuthInterceptorService(_$q_, $location);
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {

        it('responseError() should redirect to login-page when 401 is returned', () => {

            let service = makeService();

            let res = {
                status: 401
            };

            spyOn($location, 'path');

            service.responseError(res);

            expect($location.path).toHaveBeenCalledWith('/login');
        });

        it('responseError() should do nothing when status <> 401', () => {

            let service = makeService();

            let res = {
                status: 500
            };

            spyOn($location, 'path');

            service.responseError(res);

            expect($location.path).not.toHaveBeenCalledWith();
        });
    });
});