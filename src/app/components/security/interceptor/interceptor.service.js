/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition des OAuth-Interceptor-Services.
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.11
 * @since 24.11.2015, 2015.
 */
let service; // This ist in einem Interceptor nicht verfuegbar => Deshalb im Konstruktor abspeichern in Variable
class OAuthInterceptorService {

    /*@ngInject*/
    constructor($q, $location) {
        service = this;
        service.$q = $q;
        service.$location = $location;
    }

    responseError(res) {
        if (res.status === 401) {
            localStorage.removeItem('auth');
            service.$location.path('/login');
        } else {
            return service.$q.reject(res);
        }
    }
}

export default OAuthInterceptorService;