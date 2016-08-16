import editController from "../mitarbeiterEdit/mitarbeiterEdit.controller";
import editTemplate from "../mitarbeiterEdit/mitarbeiterEdit.html";

class MitarbeiterController {

    /*@ngInject*/
    constructor(mitarbeiterService, $log, $uibModal) {
        this.$log = $log;
        this.mitarbeiterService = mitarbeiterService;
        this.$uibModal = $uibModal;

        // Alle Mitarbeiter laden
        this.loadMitarbeiter();
    }

    loadMitarbeiter(){
        this.mitarbeiter = this.mitarbeiterService.getAllMitarbeiter();
    }
    
    createMitarbeiter(){
        this.$uibModal.open({
            animation: true,
            template: editTemplate,
            controller: editController,
            controllerAs: '$ctrl'
        });
    }

}

export default MitarbeiterController;