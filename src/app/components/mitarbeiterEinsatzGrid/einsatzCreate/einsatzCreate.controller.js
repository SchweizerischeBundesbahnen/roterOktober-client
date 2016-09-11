class EinsatzCreateController {

    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiter, projektService, einsatzService, pensumService) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiter = mitarbeiter;
        this.projektService = projektService;
        this.einsatzService = einsatzService;
        this.pensumService = pensumService;

        // Leere Objekte erstellen
        this.einsatz = this.createEmptyEinsatz();
        this.pensum = this.createEmptyPensum();

        this.dateFormat = "dd.MM.yyyy";

        this.selectedProjekt = "";
        this.projektNotFound = false;

        this.vonDatepicker = {
            opened: false
        };

        this.bisDatepicker = {
            opened: false
        };
    }

    createEmptyEinsatz(){
        let einsatz = {
            rolle: "",
            senioritaet: "",
            projektId: ""
        };

        return einsatz;
    }

    createEmptyPensum(){
        let pensum = {
            pensum: 100,
            anfang: null,
            ende: null
        };

        return pensum;
    }

    openEinsatzStartPopup(){
        this.vonDatepicker.opened = true;
    }

    openEinsatzEndePopup(){
        this.bisDatepicker.opened = true;
    }

    cancel(){
        this.$uibModalInstance.close();
    }

    save(){
        // Projekt speichern
        var projektPromise  = this.saveProjekt();
        projektPromise.then((projekt) => {
            // Projekt in den Einsatz übernehmen
            this.einsatz.projektId = projekt.publicId;

            // Einsatz speichern
            var einsatzPromise = this.einsatzService.save(this.mitarbeiter.uid, this.einsatz);
            einsatzPromise.$promise.then((createdEinsatz) => {
                // Jetzt haben wir alle IDs beisammen, um den Einsatz zu speichern
                var einsatzId = createdEinsatz.publicId;
                let pensumPromise = this.pensumService.save(this.mitarbeiter.uid, einsatzId, this.pensum);
                pensumPromise.$promise.then((pensum) => {
                  createdEinsatz._embedded.pensen.push(pensum);
                  this.$uibModalInstance.close(createdEinsatz);
                });
            });
        });
    }

    saveProjekt(){
        // Projekt mit exaktem Namen suchen
        var projectSearch = this.projektService.findByName(this.selectedProjekt);
        return projectSearch.$promise.then((projekt) => {
            // Wenn das Projekt noch nicht existiert, legen wir es an
            if(projekt.length > 0){
                return projekt[0];
            } else {
                var newProjekt = this.createNewProjekt();
                return this.projektService.save(newProjekt);
            }
        });
    }

    createNewProjekt(){
        var projekt = {
            name: this.selectedProjekt,
            oeName: "IT"
        }

        return projekt;
    }

    searchByName(searchtext){
        // Projekt mit Wildcards suchen
        var result = this.projektService.findByName("*" + searchtext + "*");
        return result.$promise.then(function (data) {
            return data.map(function(projekt){
                return projekt.name;
            })
        });
    }
}

export default EinsatzCreateController;
