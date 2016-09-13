class MitarbeiterEditController {

    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiterService) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiterService = mitarbeiterService;

        this.mitarbeiter = this.createEmptyMitarbeiter();
    }

    createEmptyMitarbeiter(){
        let mitarbeiter = {
            name: '',
            voranme: '',
            uid: ''
        };
        return mitarbeiter;
    }

    cancel(){
        this.$uibModalInstance.close();
    }

    save(){
        // Mitarbeiter speichern
        let result = this.mitarbeiterService.save(this.mitarbeiter);
        result.$promise.then((data) => {
          this.$uibModalInstance.close(data);
        });
    }
}

export default MitarbeiterEditController;
