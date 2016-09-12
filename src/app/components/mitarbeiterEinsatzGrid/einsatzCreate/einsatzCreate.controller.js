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
      this.projektService.findByName(this.selectedProjekt)
        .$promise.then((project) => {
          if(this._isProjectAlreadyExisting(project)){
            console.log('Existing Project', project);
            this._saveEinsatz(project[0]);
          }
          else{
            let newProjekt = this._createNewProjekt();
            this._saveNewProject(newProjekt);
          }
        });
    }

    _saveNewProject(newProjekt){
      this.projektService.save(newProjekt)
        .$promise.then((createdProject) => {
          this._saveEinsatz(createdProject);
        })
    }

    _saveEinsatz(project){
      this.einsatz.projektId = project.publicId;
      this.einsatzService.save(this.mitarbeiter.uid, this.einsatz)
        .$promise.then((createdEinsatz) => {
        // Jetzt haben wir alle IDs beisammen, um den Einsatz zu speichern
        let einsatzId = createdEinsatz.publicId;
        this._createPensum(this.mitarbeiter.uid, einsatzId, this.pensum, createdEinsatz);
      })
    }

    _createPensum(mitarbeiterUID, einsatzId, pensum, createdEinsatz){
      this.pensumService.save(mitarbeiterUID, einsatzId, pensum)
        .$promise.then((pensum) => {
          createdEinsatz._embedded.pensen.push(pensum);
          this.$uibModalInstance.close(createdEinsatz);
        })
    }

    _isProjectAlreadyExisting(project){
      return project.length > 0;
    }

    _createNewProjekt(){
        let projekt = {
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
