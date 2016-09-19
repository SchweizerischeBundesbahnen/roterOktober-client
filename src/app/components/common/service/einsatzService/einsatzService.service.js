class EinsatzService {
    /*@ngInject*/
    constructor($resource, config, $http) {
        this.Einsatz = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz', {uid: '@userId'});
        this.config = config;
        this.$http = $http;
    }

    getEinsatzForMitarbeiter(userId){
      return this.Einsatz.query({uid: userId});
    }

    save(userId, einsatz){
      return this.Einsatz.save({uid: userId}, einsatz);
    }

    deleteEinsatz(einsatzId){
      return this.$http.delete(this.config.restEndPoint + '/einsatz/' + einsatzId);
    }
}

export default EinsatzService;
