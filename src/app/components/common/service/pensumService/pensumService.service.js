class PensumService {
    /*@ngInject*/
    constructor($http, $resource, config) {
        this.$http = $http;
        this.config = config;
        this.Pensum = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz/:einsatz/pensum', {uid: '@userId', einsatz: '@einsatz'});
    }

    getPensenFromEinsatz(einsatz){
      let pensenUrl = einsatz._links.pensen.href;
      return this.$http.get(pensenUrl);
    }

    save(userId, einsatzId, pensum){
      return this.Pensum.save({uid: userId, einsatz: einsatzId}, pensum);
    }

    updatePensum(pensum, pensumId){
        return this.$http.put(this.config.restEndPoint + '/pensum/' + pensumId, pensum);
    }
}

export default PensumService;
