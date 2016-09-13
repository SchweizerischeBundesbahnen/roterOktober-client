class PensumService {
    /*@ngInject*/
    constructor($http, $resource, config) {
        this.$http = $http;
        this.Pensum = $resource(config.restEndPoint + '/mitarbeiter/:uid/einsatz/:einsatz/pensum', {uid: '@userId', einsatz: '@einsatz'});
    }

    getPensenFromEinsatz(einsatz){
        var pensenUrl = einsatz._links.pensen.href;
        return this.$http.get(pensenUrl);
    }

    save(userId, pensumId, pensum){
        return this.Pensum.save({uid: userId, einsatz: pensumId}, pensum);
    }
}

export default PensumService;