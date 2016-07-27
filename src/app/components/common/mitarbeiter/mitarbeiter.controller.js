class MitarbeiterController {

    /*@ngInject*/
    constructor(mitarbeiterService, $log) {
        this.$log = $log;
        this.mitarbeiterService = mitarbeiterService;

        // Alle Mitarbeiter laden
        this.loadMitarbeiter();
    }

    loadMitarbeiter(){
        this.mitarbeiter = this.mitarbeiterService.getAllMitarbeiter();
    }

}

export default MitarbeiterController;