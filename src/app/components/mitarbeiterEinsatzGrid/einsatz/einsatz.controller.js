import createController from "../einsatzCreate/einsatzCreate.controller";
import createTemplate from "../einsatzCreate/einsatzCreate.html";

class EinsatzController {

    /*@ngInject*/
    constructor(einsatzService, projektService, $uibModal) {
        this.einsatzService = einsatzService;
        this.projektService = projektService;
        this.$uibModal = $uibModal;
        this.einsaetzeProProjekt = {};
        this.projekte = {};

        // Einsatz laden
        this.loadEinsaetze();
    }

    loadEinsaetze() {
        this.einsaetze = this.einsatzService.getEinsatzForMitarbeiter(this.mitarbeiter.uid);
        this.einsaetze.$promise.then(() => this.loadProjekte());
    }

    loadProjekte() {
        // Es ist möglich, dass ein Mitarbeiter mehrere Einsätze im gleichen Projekt hat. Deshalb
        // gruppieren wir die Einsätze nach Projekt
        this.einsaetzeProProjekt = {};
        this.projekte = {};

        for (var i = 0; i < this.einsaetze.length; i++) {
            var einsatz = this.einsaetze[i];

            // Projekt laden
            this.loadProjektForEinsatz(einsatz, this.projekte, this.einsaetzeProProjekt);
        }
    }

    loadProjektForEinsatz(einsatz, projekteRef, einsaetzeProProjektRef) {
        this.projektService.getProjektByEinsatz(einsatz).then(function (data) {
            // Haben wir schon ein solches Projekt?
            var projekt = data.data;
            projekteRef[projekt.publicId] = projekt;

            if (einsaetzeProProjektRef[projekt.publicId]) {
                einsaetzeProProjektRef[projekt.publicId].push(einsatz);
            } else {
                einsaetzeProProjektRef[projekt.publicId] = [einsatz];
            }
        });
    }
    
    createEinsatz(){
        let vm = this;

        this.$uibModal.open({
            animation: true,
            template: createTemplate,
            controller: createController,
            bindToController: true,
            controllerAs: '$ctrl',
            resolve: {
                mitarbeiter: function(){
                    return vm.mitarbeiter
                }
            }
        })
    }
}

export default EinsatzController;