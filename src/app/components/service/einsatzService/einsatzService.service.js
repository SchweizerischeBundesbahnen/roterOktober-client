class EinsatzService {
    /*@ngInject*/
    constructor($resource, config) {
        this.Einsatz = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz', {uid: '@userId'});
    }
    
    getEinsatzForMitarbeiter(userId){
        return this.Einsatz.get({uid: userId});
    }
}

export default EinsatzService;