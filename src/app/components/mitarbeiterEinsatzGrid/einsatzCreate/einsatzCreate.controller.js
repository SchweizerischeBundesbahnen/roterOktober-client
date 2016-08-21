class EinsatzCreateController {
    
    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiter) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiter = mitarbeiter;
        
        this.einsatzStart = null;
        this.einsatzEnde = null;

        this.dateFormat = "dd.MM.yyyy";
        
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
}

export default EinsatzCreateController;