class EinsatzService {
    /*@ngInject*/
    constructor($resource, config, $http) {
        this.Einsatz = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz', {uid: '@userId'});
        this.$http = $http;
        this.config = config;
    }

    getEinsatzForMitarbeiter(userId){
        return this.$http.get(this.config.restEndPoint + `/mitarbeiter/${userId}/einsatz`);
    }

    save(userId, einsatz){
        console.log('Der Einsatz', einsatz);
        return this.Einsatz.save({uid: userId}, einsatz);
    }
}

export default EinsatzService;
