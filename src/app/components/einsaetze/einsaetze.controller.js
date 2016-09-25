import createMitarbeiterController from "./mitarbeiterEdit/mitarbeiterEdit.controller";
import createMitarbeiterTemplate from "./mitarbeiterEdit/mitarbeiterEdit.html";
import createEinsatzController from "./einsatzCreate/einsatzCreate.controller";
import createEinsatzTemplate from "./einsatzCreate/einsatzCreate.html";
import confirmDialogController from "../common/confirmdialog/confirmDialog.controller";

class MitarbeiterEinsatzController {

    /*@ngInject*/
    constructor(mitarbeiterService, einsatzService, messagesService,
                $uibModal, projektService) {
        this.mitarbeiterService = mitarbeiterService;
        this.einsatzService = einsatzService;
        this.messagesService = messagesService;
        this.projektService = projektService;
        this.$uibModal = $uibModal;
        this.mitarbeiter = [];
        this.year = parseInt(new Date().getFullYear());
        this.mitarbeiterEinsaetze = [];
        this._loadMitarbeiter();
    }

    _loadMitarbeiter() {
        this.mitarbeiterService.getAllMitarbeiter()
            .$promise.then((response) => {
                this.mitarbeiter = response;
                this._getEinsatzeForMitarbeiter(this.mitarbeiter);
            },
            (error) => {
                this.messagesService.errorMessage('Ooops!! Etwas hat nicht funktioniert', false);
            }
        );
    }

    _getEinsatzeForMitarbeiter(mitarbeiter) {
        mitarbeiter.forEach((mitarbeiter) => {
            this.einsatzService.getEinsatzForMitarbeiter(mitarbeiter.uid)
                .$promise.then((response) => {
                    let einsatze = response;
                    this._getProjekteForEinsatze(mitarbeiter, einsatze);
                },
                (error) => {
                    this.messagesService.errorMessage('Ooops!! Etwas hat nicht funktioniert', false);
                }
            )
        })
    }

    _getProjekteForEinsatze(mitarbeiter, einsatze) {
        let projektEinsaetze = [];

        if (einsatze.length === 0) {
            this._createMitarbeiterEinsatz(mitarbeiter, einsatze);
        }

        einsatze.forEach((einsatz) => {
            this.projektService.getProjektFromEndpoint(einsatz._links.projekt.href)
                .then((response) => {
                    projektEinsaetze.push(this._convertToProjektEinsatz(einsatz, response.data));
                    if (projektEinsaetze.length === einsatze.length) {
                        this._createMitarbeiterEinsatz(mitarbeiter, projektEinsaetze);
                    }
                })
        });
    }

    _createMitarbeiterEinsatz(mitarbeiter, projektEinsaetze) {
        let mitarbeiterEinsatze = this._convertProjektEinsaetze(projektEinsaetze);
        let einsatzSummary = {
            mitarbeiter: mitarbeiter,
            einsatze: mitarbeiterEinsatze,
        }
        this.mitarbeiterEinsaetze.push(einsatzSummary);
    }

    _convertProjektEinsaetze(projektEinsaetze) {
        let mitarbeiterEinsatz = [];
        projektEinsaetze.forEach((projektEinsatz) => {
            mitarbeiterEinsatz.push(this._convertProjektEinsatz(projektEinsatz));
        });
        return mitarbeiterEinsatz;
    }

    _convertProjektEinsatz(projektEinsatz) {
        return {
            projekt: projektEinsatz.projekt,
            pensen: projektEinsatz.einsatz._embedded.pensen,
            senioritaet: projektEinsatz.einsatz.senioritaet,
            rolle: projektEinsatz.einsatz.rolle,
            einsatzId: projektEinsatz.einsatz.publicId
        };
    }

    createMitarbeiter() {
        this.$uibModal.open({
                animation: true,
                template: createMitarbeiterTemplate,
                controller: createMitarbeiterController,
                controllerAs: '$ctrl'
            })
            .result.then((createdMitarbeiter) => {
            if (createdMitarbeiter) {
                this._addCreatedMitarbeiter(createdMitarbeiter);
            }
        })
    }

    _addCreatedMitarbeiter(newMitarbeiter) {
        let einsatzSummary = {
            mitarbeiter: newMitarbeiter,
            einsatze: [],
        }
        this.mitarbeiterEinsaetze.push(einsatzSummary);
    }

    createEinsatz(mitarbeiter, index) {
        this.$uibModal.open({
                animation: true,
                template: createEinsatzTemplate,
                controller: createEinsatzController,
                bindToController: true,
                controllerAs: '$ctrl',
                resolve: {
                    mitarbeiter: () => mitarbeiter,
                    existingEinsatz: () => undefined,
                    existingPensum: () => undefined
                }
            })
            .result.then((newEinsatz) => {
            if (newEinsatz) {
                this._getProjektFromEndpoint(newEinsatz, index);
            }
        });
    }

    _getProjektFromEndpoint(newEinsatz, index) {
        this.projektService.getProjektFromEndpoint(newEinsatz._links.projekt.href)
            .then((response) => {
                let projektEinsatz = this._convertToProjektEinsatz(newEinsatz, response.data);
                this._addNewEinsatzToMitarbeiter(projektEinsatz, index);
            });
    }

    _convertToProjektEinsatz(einsatz, projekt) {
        return {
            einsatz: einsatz,
            projekt: projekt
        }
    }

    _addNewEinsatzToMitarbeiter(newEinsatz, index) {
        let convertedEinsatz = this._convertProjektEinsatz(newEinsatz);
        this.mitarbeiterEinsaetze[index].einsatze.push(convertedEinsatz);
    }

    deleteEinsatz(einsatz) {
        let projekt = einsatz.projekt.name;
        confirmDialogController.showDialog(this.$uibModal, 'Wirklich löschen?', 'Wollen Sie den Einsatz auf dem Projekt ' + projekt + ' wirklich löschen?').then(() => {
            // Löschen
            this.einsatzService.deleteEinsatz(einsatz.einsatzId)
                .then((data) => {
                        this.mitarbeiterEinsaetze.forEach(mitarbeiterEinsatz => {
                            mitarbeiterEinsatz.einsatze = mitarbeiterEinsatz.einsatze
                                .filter(einatz => einatz.einsatzId !== einsatz.einsatzId);
                        });
                    },
                    (error) => {
                        this.messagesService.errorMessage('Ooops!! beim Löschen ist ein Fehler aufgetreten', false);
                    }
                )
        }, () => {
            // Löschen wurde abgebrochen
        });
    }

    deleteMitarbeiter(mitarbeiter) {
        let name = mitarbeiter.vorname + " " + mitarbeiter.name;
        confirmDialogController.showDialog(this.$uibModal, 'Wirklich löschen?', "Wollen Sie den Mitarbeiter " + name + " wirklich löschen?").then(() => {
            this.mitarbeiterService.deleteMitarbeiter(mitarbeiter.uid)
                .$promise.then(() => {
                    this.mitarbeiterEinsaetze = this.mitarbeiterEinsaetze.filter(mitarbeiterEinsatz =>
                    mitarbeiterEinsatz.mitarbeiter.uid !== mitarbeiter.uid);
                },
                (error) => {
                    this.messagesService.errorMessage('Ooops!! beim Löschen ist ein Fehler aufgetreten', false);
                }
            )
        }, () => {
            // Löschen wurde abgebrochen
        });
    }


    addPensum(mitarbeiter, einsatz) {
        this.$uibModal.open({
            animation: true,
            template: createEinsatzTemplate,
            controller: createEinsatzController,
            bindToController: true,
            controllerAs: '$ctrl',
            resolve: {
                mitarbeiter: () => mitarbeiter,
                existingEinsatz: () => einsatz,
                existingPensum: () => undefined
            }
        }).
        result.then((newPensum) => {
            if (newPensum) {
                this._applyNewPensumToViewModel(einsatz, newPensum);
            }
        });
    }

    _applyNewPensumToViewModel(einsatz, newPensum) {
        this.mitarbeiterEinsaetze.forEach(mitarbeiterEinsatz => {
            mitarbeiterEinsatz.einsatze.forEach((e) => {
                if (e.einsatzId === einsatz.einsatzId) {
                    e.pensen.push(newPensum);
                }
            })
        })
        //There is no DeepWatch Aailable in the child component - therefore we need to change the main Object
        this.mitarbeiterEinsaetze = angular.copy(this.mitarbeiterEinsaetze);
    }

    _applyEditedPensumToViewModel(einsatz, editedPensum) {
        this.mitarbeiterEinsaetze.forEach(mitarbeiterEinsatz => {
            mitarbeiterEinsatz.einsatze.forEach((e) => {
                if (e.einsatzId === einsatz.einsatzId) {
                  for(let i = 0; i < e.pensen.length; i++){
                    if(e.pensen[i].publicId === editedPensum.publicId){
                        e.pensen[i] = editedPensum;
                        break;
                    }
                  }
                }
            })
        })
        //There is no DeepWatch Aailable in the child component - therefore we need to change the main Object
        this.mitarbeiterEinsaetze = angular.copy(this.mitarbeiterEinsaetze);
    }

    editPensum(mitarbeiter, einsatz, pensumId){
      let existingPensum = einsatz.pensen.find(pensum => {
        return pensum.publicId === pensumId}
      );

      this.$uibModal.open({
          animation: true,
          template: createEinsatzTemplate,
          controller: createEinsatzController,
          bindToController: true,
          controllerAs: '$ctrl',
          resolve: {
              mitarbeiter: () => mitarbeiter,
              existingEinsatz: () => einsatz,
              existingPensum: () => existingPensum
          }
      }).
      result.then((editedPensum) => {
          if (editedPensum) {
              this._applyEditedPensumToViewModel(einsatz, editedPensum);
          }
      });
    }
}

export default MitarbeiterEinsatzController;
