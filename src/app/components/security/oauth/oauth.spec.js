/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests OAuthService
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import OAuthModule from './oauth';
import OAuthService from './oauth.service';

describe('OAuthService', () => {
    let $rootScope, makeService, $httpBackend,
        messagesServiceMock, configMock, translateMock,
        $location, $windowMock;

    messagesServiceMock = {
        errorMessage: function () {}
    };

    configMock = {
        authServerUrl: 'authServerUrl/',
        authLoginUrl: 'authLoginUrl',
        authRedirectUrl: '#/logincallback'
    };

    translateMock = {
        instant: function () {
            return 'Login fehlgeschlagen';
        }
    };

    $windowMock = {
        location: {
            replace: function() {}
        }
    };

    beforeEach(window.module(OAuthModule.name));
    beforeEach(inject((_$rootScope_, _$httpBackend_, _$http_, _$log_,
                       _$location_, _$httpParamSerializer_, _$q_, _$window_) => {

        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;

        $windowMock.localStorage = _$window_.localStorage;

        $windowMock.localStorage.clear();

        makeService = () => {
            return new OAuthService(_$http_, configMock, _$log_, $location,
                $windowMock, _$httpParamSerializer_, messagesServiceMock, translateMock, _$q_);
        };
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {

        it('login() should redirect to login-page when !isloggedIn', () => {

            let service = makeService();

            spyOn($windowMock.location, 'replace');

            service.login();

            expect($windowMock.location.replace).toHaveBeenCalledWith('authServerUrl/authLoginUrl%23%2Flogincallback');
        });

        it('login() should redirect to homepage when isLoggedIn', () => {

            let service = makeService();

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true
            }));

            spyOn($windowMock.location, 'replace');

            service.login();

            expect($windowMock.location.replace).not.toHaveBeenCalled();
        });

        it('handleCallback() should GET userData && save authData to localStorage when token is present', () => {
            let service = makeService();

            $httpBackend.expectGET('authServerUrl/user').respond(200, {name: 'Reto Lehmann'});

            service.handleCallback('&access_token=test');
            $httpBackend.flush();

            expect(JSON.parse($windowMock.localStorage.getItem('auth')).name).toBe('Reto Lehmann');
        });

        it('handleCallback() should not save authData to localStorage when userdata-POST fails', () => {
            let service = makeService();

            spyOn(messagesServiceMock, 'errorMessage');

            service.handleCallback('&error=Invalid grant');

            expect(JSON.parse($windowMock.localStorage.getItem('auth'))).toBeNull();
            expect(messagesServiceMock.errorMessage).toHaveBeenCalledWith('Login fehlgeschlagen', true);
        });

        it('logout() should do nothing when not loggedIn', () => {
            let service = makeService();

            spyOn($location, 'path');

            service.logout();

            expect($location.path).toHaveBeenCalledWith('/');
        });

        it('logout() should POST to logout and remove authData from localStorage when loggedIn', () => {
            let service = makeService();

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true
            }));

            $httpBackend.expectPOST('authServerUrl/logout').respond(200, '');

            service.logout();

            $httpBackend.flush();

            expect(localStorage.getItem('auth')).toBeNull();
        });

        it('logout() should remove authData from localStorage when loggedIn and POST fails', () => {
            let service = makeService();

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true
            }));

            $httpBackend.expectPOST('authServerUrl/logout').respond(500, '');

            service.logout();

            $httpBackend.flush();

            expect($windowMock.localStorage.getItem('auth')).toBeNull();
        });

        it('checkToken() should return false when not isLoggedIn', () => {
            let service = makeService();

            var result = service.checkToken();

            result.then((val) => {
                expect(val).toBeFalsy();
            });
        });

        it('checkToken() should return true when isLoggedIn && token is valid', () => {
            let service = makeService();

            $httpBackend.expectPOST('authServerUrl/oauth/check_token').respond(200, '');

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true,
                details: {tokenValue: 'xxxx'}
            }));

            var result = service.checkToken();
            $httpBackend.flush();

            result.then((val) => {
                expect(val).toBeTruthy();
            });
        });

        it('checkToken() should return false when POST fails', () => {
            let service = makeService();

            $httpBackend.expectPOST('authServerUrl/oauth/check_token').respond(500, '');

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true,
                details: {tokenValue: 'xxxx'}
            }));

            var result = service.checkToken();
            $httpBackend.flush();

            result.then((val) => {
                expect(val).toBeFalsy();
            });
        });

        it('isLoggedIn() should return true when isAuthenticated', () => {
            let service = makeService();

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true
            }));

            let result = service.isLoggedIn();

            expect(result).toBeTruthy();
        });

        it('isLoggedIn() should return false when !isAuthenticated', () => {
            let service = makeService();

            let result = service.isLoggedIn();

            expect(result).toBeFalsy();
        });

        it('getUsername() should return username when isAuthenticated', () => {
            let service = makeService();

            $windowMock.localStorage.setItem('auth', JSON.stringify({
                authenticated: true,
                name: 'Reto Lehmann'
            }));

            let result = service.getUsername();

            expect(result).toBe('Reto Lehmann');
        });

        it('getUsername() should return "" when !isAuthenticated', () => {
            let service = makeService();

            let result = service.getUsername();

            expect(result).toBe('');
        });
    });
});