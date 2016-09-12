class EinsatzService {
    /*@ngInject*/
    constructor($resource, config) {
        this.Einsatz = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz', {uid: '@userId'});
        this.config = config;
    }

    getEinsatzForMitarbeiter(userId){
      return this.Einsatz.query({uid: userId});
    }

    save(userId, einsatz){
      console.log('Einsatz im Service', einsatz);
      return this.Einsatz.save({uid: userId}, einsatz);
    }
}

export default EinsatzService;
