class PensumService {
    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getPensenFromEinsatz(einsatz){
        var pensenUrl = einsatz._links.pensen.href;
        return this.$http.get(pensenUrl);
    }

}

export default PensumService;