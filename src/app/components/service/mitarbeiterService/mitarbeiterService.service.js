class MitarbeiterServiceService {

    /*@ngInject*/
    constructor($resource, config) {
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
    
}

export default MitarbeiterServiceService;