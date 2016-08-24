class ProjektServiceService {
    /*@ngInject*/
    constructor($resource, $http, config) {
        this.$resource = $resource;
        this.$http = $http;

        this.Projekte = $resource(config.restEndPoint + '/mitarbeiter/:projektId',
            {projektId: '@projektId'},
            {
                searchByName: {method: 'GET', url: config.restEndPoint + '/projekt/search/byname/:name', isArray: true}
            });
    }

    getProjektByID(projektId){
        return this.Projekte.get({"projektId": projektId});
    }

    getProjektByEinsatz(einsatz){
        // URL des Projektes auslesen
        var projektUrl = einsatz._links.projekt.href;
        return this.$http.get(projektUrl);
    }

    findByName(name){
        return this.Projekte.searchByName({name: name});
    }

}

export default ProjektServiceService;