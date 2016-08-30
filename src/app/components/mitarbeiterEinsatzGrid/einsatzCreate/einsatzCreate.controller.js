class EinsatzCreateController {
    
    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiter, projektService) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiter = mitarbeiter;
        this.projektService = projektService;

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
        this.$uibModalInstance.close();
    }
    
    saveProjekt(){
        // Projekt mit exaktem Namen suchen
        var projectSearch = this.projektService.findByName(this.selectedProjekt);
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