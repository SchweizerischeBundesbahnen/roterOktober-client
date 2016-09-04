class MitarbeiterService {

    /*@ngInject*/
    constructor($http, $resource, config) {
        this.$http = $http;
        this.config = config;
        this.Mitarbeiter = $resource(config.restEndPoint + '/mitarbeiter/:uid', {uid: '@userId'});
    }

    /**
     * Liefert alle Mitarbeiter zurück
     */
    getAllMitarbeiter(){
        return this.$http.get(this.config.restEndPoint + '/mitarbeiter/');
    }

    /**
     * Gibt einen bestimmten Benutzer zurück
     * @param userId U-Nummer des Benutzers
     */
    getByUserid(userId){
        return this.Mitarbeiter.get({uid: userId});
    }

    save(mitarbeiter){
        return this.Mitarbeiter.save(mitarbeiter);
    }

}

export default MitarbeiterService;
