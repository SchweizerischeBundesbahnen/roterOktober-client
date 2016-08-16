class MitarbeiterEditController {
    
    /*@ngInject*/
    constructor($uibModalInstance) {
        this.$uibModalInstance = $uibModalInstance;
        
        this.content = 'Hello, MitarbeiterEdit';
    }
    
    cancel(){
        alert("Abbrechen");
    }
    
    ok(){
        alert("OK");
    }
}

export default MitarbeiterEditController;