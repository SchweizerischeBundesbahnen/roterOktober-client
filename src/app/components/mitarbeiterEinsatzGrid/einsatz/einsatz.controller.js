class EinsatzController {

    /*@ngInject*/
    constructor(einsatzService, projektService) {
        this.einsatzService = einsatzService;
        this.projektService = projektService;
        this.einsaetzeProProjekt = {};
        this.projekte = {};

        // Einsatz laden
        this.loadEinsaetze();
    }

    loadEinsaetze(){
        this.einsaetze = this.einsatzService.getEinsatzForMitarbeiter(this.mitarbeiter.uid);
        this.einsaetze.$promise.then(() => this.loadProjekte());
    }

    loadProjekte() {
        // Es ist möglich, dass ein Mitarbeiter mehrere Einsätze im gleichen Projekt hat. Deshalb
        // gruppieren wir die Einsätze nach Projekt
        this.einsaetzeProProjekt = {};
        this.projekte = {};

        for(var i = 0; i < this.einsaetze.length; i++) {
            var einsatz = this.einsaetze[i];

            // Projekt laden
            this.loadProjektForEinsatz(einsatz, this.projekte, this.einsaetzeProProjekt);
        }
    }

    loadProjektForEinsatz(einsatz, projekteRef, einsaetzeProProjektRef){
        this.projektService.getProjektByEinsatz(einsatz).then(function(data) {
            // Haben wir schon ein solches Projekt?
            var projekt = data.data;
            projekteRef[projekt.publicId] = projekt;
            
            if(einsaetzeProProjektRef[projekt.publicId]) {
                einsaetzeProProjektRef[projekt.publicId].push(einsatz);
            } else {
                einsaetzeProProjektRef[projekt.publicId] = [einsatz];
            }
        });
    }
}

export default EinsatzController;