class EinsatzService {
    /*@ngInject*/
    constructor($resource, config) {
        this.Einsatz = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz', {uid: '@userId'});
    }
    
    getEinsatzForMitarbeiter(userId){
        return this.Einsatz.query({uid: userId});
    }
}

export default EinsatzService;