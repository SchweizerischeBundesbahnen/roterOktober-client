class MitarbeiterService {

    /*@ngInject*/
    constructor($resource, config, $http) {
        this.config = config;
        this.$http = $http;
        this.Mitarbeiter = $resource(config.restEndPoint + '/mitarbeiter/:uid', {uid: '@userId'});
    }

    /**
     * Liefert alle Mitarbeiter zurück
     */
    getAllMitarbeiter(){
        return this.Mitarbeiter.query();
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

    deleteMitarbeiter(userId){
      return this.Mitarbeiter.remove({uid: userId});
    }

    getMitarbeiterAuslastung(uid){
      return this.$http.get(this.config.restEndPoint + `/mitarbeiter/${uid}/auslastung`)
    }

}

export default MitarbeiterService;
