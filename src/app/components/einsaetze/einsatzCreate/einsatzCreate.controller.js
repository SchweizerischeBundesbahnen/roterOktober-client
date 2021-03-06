class EinsatzCreateController {

    /*@ngInject*/
    constructor($uibModalInstance, mitarbeiter, existingEinsatz, existingPensum,
      projektService, einsatzService, pensumService, $timeout) {
        this.$uibModalInstance = $uibModalInstance;
        this.mitarbeiter = mitarbeiter;
        this.existingEinsatz = existingEinsatz;
        this.projektService = projektService;
        this.existingPensum = existingPensum;
        this.einsatzService = einsatzService;
        this.pensumService = pensumService;
        this.$timeout = $timeout;
        this.isEinsatzExisting = false;
        this.isPensumExisting = false;
        this.hasError = false;

        if(this.existingEinsatz){
          this.isEinsatzExisting = true;
          this.selectedProjekt = this.existingEinsatz.projekt.name;
        }

        this.pensum = this.createEmptyPensum();
        if(this.existingPensum){
          this.isPensumExisting = true;
          this.pensum.pensum = this.existingPensum.pensum;
          this.pensum.anfang = Date.parse(this.existingPensum.anfang);
          if(new Date(Date.parse(this.existingPensum.ende)).getFullYear() !== 2099){  //Default Date for Unbestimmt
            this.pensum.ende = Date.parse(this.existingPensum.ende);
          }
        }

        this.einsatz = this._createEinsatz();
        this.dateFormat = "dd.MM.yyyy";
        this.projektNotFound = false;
        this.vonDatepicker = {
            opened: false
        };
        this.bisDatepicker = {
            opened: false
        };
    }

    _createEinsatz(){
      if(!this.existingEinsatz){
        return this._createEmptyEinsatz();
      }
      return this._convertExistingEinsatz();
    }

    _convertExistingEinsatz(){
      return {
        rolle: this.existingEinsatz.rolle,
        senioritaet: this.existingEinsatz.senioritaet,
        projektId: this.existingEinsatz.projekt.publicId
      }
    }

    _createEmptyEinsatz(){
        return {
            rolle: 'ae',
            senioritaet: 'prof',
            projektId: ''
        };
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
            this._saveEinsatz(project[0]);
          }
          else{
            let newProjekt = this._createNewProjekt();
            this._saveNewProject(newProjekt);
          }
        }
        ,() => {
          this.hasError = true;
          this._toggleErrorMessageAfterTimeout(2000);
        }
      );
    }

    _saveNewProject(newProjekt){
      this.projektService.save(newProjekt)
        .$promise.then((createdProject) => {
          this._saveEinsatz(createdProject);
        },
        () => {
          this.hasError = true;
          this._toggleErrorMessageAfterTimeout(2000);
        }
      )
    }

    _saveEinsatz(project){
      this.einsatz.projektId = project.publicId;
      this.einsatzService.save(this.mitarbeiter.uid, this.einsatz)
        .$promise.then((createdEinsatz) => {
        // Jetzt haben wir alle IDs beisammen, um den Einsatz zu speichern
        this._createPensum(this.mitarbeiter.uid, this.pensum, createdEinsatz);
      },
      () => {
        this.hasError = true;
        this._toggleErrorMessageAfterTimeout(2000);
      }
    )
    }

    _createPensum(mitarbeiterUID, pensum, createdEinsatz){
      if(!pensum.ende){
        pensum.ende = new Date(2099, 0, 1);
      }
      this.pensumService.save(mitarbeiterUID, createdEinsatz.publicId, pensum)
        .$promise.then((pensum) => {
          createdEinsatz._embedded.pensen.push(pensum);
          this.$uibModalInstance.close(createdEinsatz);
        },
        () => {
          this.hasError = true;
          this._toggleErrorMessageAfterTimeout(2000);
        }
      )
    }

    _toggleErrorMessageAfterTimeout(timeout){
      this.$timeout(() => {
        this.hasError = false;
      }, timeout);
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
        },
        () => {
          this.hasError = true;
          this._toggleErrorMessageAfterTimeout(2000);
        }
      );
    }

    addPensum(){
      if(!this.pensum.ende){
        this.pensum.ende = new Date(2099, 0, 1);
      }
      this.pensumService.save(this.mitarbeiter.uid, this.existingEinsatz.einsatzId, this.pensum)
        .$promise.then((response) => {
          this.$uibModalInstance.close(response);
        },
        () => {
          this.hasError = true;
          this._toggleErrorMessageAfterTimeout(2000);
        }
      );
    }

    updatePensum(){
      this._convertPensumDatesToIso();
      this.pensumService.updatePensum(this.pensum, this.existingPensum.publicId)
        .then(response => {
          this.$uibModalInstance.close(response.data);
        },
        () => {
          this.hasError = true;
          this._toggleErrorMessageAfterTimeout(2000);
        }
      )
    }

    _convertPensumDatesToIso(){
      this.pensum.anfang = new Date(this.pensum.anfang).toISOString();
      if(this.pensum.ende){
        this.pensum.ende = new Date(this.pensum.ende).toISOString();
      }
      else{
        this.pensum.ende = new Date(2099,0,1).toISOString();
      }
    }
}

export default EinsatzCreateController;
