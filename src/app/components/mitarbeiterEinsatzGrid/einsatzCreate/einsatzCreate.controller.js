class EinsatzCreateController {
    
    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiter, projektService) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiter = mitarbeiter;
        this.projektService = projektService;
        
        this.einsatzStart = null;
        this.einsatzEnde = null;

        this.dateFormat = "dd.MM.yyyy";
        
        this.selectedProjekt = "";
        
        this.vonDatepicker = {
            opened: false
        };

        this.bisDatepicker = {
            opened: false
        };
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

    searchByName(searchtext){
        var result = this.projektService.findByName(searchtext);
        return result.$promise.then(function (data) {
            return data.map(function(projekt){
                return projekt.name;
            })
        });
    }
}

export default EinsatzCreateController;