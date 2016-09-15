class ProjektServiceService {
    /*@ngInject*/
    constructor($resource, $http, config) {
        this.$resource = $resource;
        this.$http = $http;

        this.Projekte = $resource(config.restEndPoint + '/mitarbeiter/:projektId',
            {projektId: '@projektId'},
            {
                searchByName: {method: 'GET', url: config.restEndPoint + '/projekt/search/byname/:name', isArray: true},
                save: {method: 'POST', url: config.restEndPoint + '/projekt'}
            });
    }

    getProjektByID(projektId){
      return this.Projekte.get({"projektId": projektId});
    }

    getProjektFromEndpoint(endpoint){
      return this.$http.get(endpoint);
    }

    getProjektByEinsatz(einsatz){
        // URL des Projektes auslesen
        var projektUrl = einsatz._links.projekt.href;
        return this.$http.get(projektUrl);
    }

    findByName(name){
        return this.Projekte.searchByName({name: name});
    }

    save(projekt){
        return this.Projekte.save(projekt);
    }

}

export default ProjektServiceService;
