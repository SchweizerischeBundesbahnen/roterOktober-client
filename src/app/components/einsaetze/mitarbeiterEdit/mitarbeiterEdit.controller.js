class MitarbeiterEditController {

    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiterService, messagesService, $timeout) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiterService = mitarbeiterService;
        this.messagesService = messagesService;
        this.$timeout = $timeout;
        this.mitarbeiter = this.createEmptyMitarbeiter();
        this.hasError = false;
    }

    createEmptyMitarbeiter(){
        let mitarbeiter = {
            name: '',
            voranme: '',
            uid: '',
            oeName: ''
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
        }
        ,(error) => {
          this.hasError = true;
          this.$timeout(() => {
            this.hasError = false;
          }, 2000);
        }
      );
    }
}

export default MitarbeiterEditController;
