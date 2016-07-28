class EinsatzController {
    
    /*@ngInject*/
    constructor(einsatzService) {
        this.einsatzService = einsatzService;

        // Einsatz laden
        this.loadEinsaetze();
    }

    loadEinsaetze(){
        this.einsaetze = this.einsatzService.getEinsatzForMitarbeiter(this.mitarbeiter.uid);
    }
    
}

export default EinsatzController;