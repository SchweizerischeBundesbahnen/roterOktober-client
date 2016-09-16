import createMitarbeiterController from "./mitarbeiterEdit/mitarbeiterEdit.controller";
import createMitarbeiterTemplate from "./mitarbeiterEdit/mitarbeiterEdit.html";
import createEinsatzController from "./einsatzCreate/einsatzCreate.controller";
import createEinsatzTemplate from "./einsatzCreate/einsatzCreate.html";

class MitarbeiterEinsatzController{

  constructor(/*ngInject*/ mitarbeiterService, einsatzService, messagesService,
    $uibModal, projektService){
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

  _loadMitarbeiter(){
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

  _getEinsatzeForMitarbeiter(mitarbeiter){
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

  _getProjekteForEinsatze(mitarbeiter, einsatze){
      let projektEinsaetze = [];

      if(einsatze.length === 0){
        this._createMitarbeiterEinsatz(mitarbeiter, einsatze);
      }

      einsatze.forEach((einsatz) => {
        this.projektService.getProjektFromEndpoint(einsatz._links.projekt.href)
          .then((response) => {
            projektEinsaetze.push(this._convertToProjektEinsatz(einsatz, response.data));
            if(projektEinsaetze.length === einsatze.length){
              this._createMitarbeiterEinsatz(mitarbeiter, projektEinsaetze);
            }
          })
      });
  }

  _createMitarbeiterEinsatz(mitarbeiter, projektEinsaetze){
    let mitarbeiterEinsatze = this._convertProjektEinsaetze(projektEinsaetze);
    let einsatzSummary = {
      mitarbeiter: mitarbeiter,
      einsatze: mitarbeiterEinsatze,
    }
    this.mitarbeiterEinsaetze.push(einsatzSummary);
  }

  _convertProjektEinsaetze(projektEinsaetze){
    let mitarbeiterEinsatz = [];
    projektEinsaetze.forEach((projektEinsatz) => {
      mitarbeiterEinsatz.push(this._convertProjektEinsatz(projektEinsatz));
    });
    return mitarbeiterEinsatz;
  }

  _convertProjektEinsatz(projektEinsatz){
    return {
      projekt: projektEinsatz.projekt,
      pensum: projektEinsatz.einsatz._embedded.pensen[0], //TODO kk: Müssen wir noch mehrere Einsätze unterstützen
      senioritaet: projektEinsatz.einsatz.senioritaet,
      rolle: projektEinsatz.einsatz.rolle,
      publicId: projektEinsatz.einsatz.publicId
    };
  }

  createMitarbeiter(){
    this.$uibModal.open({
        animation: true,
        template: createMitarbeiterTemplate,
        controller: createMitarbeiterController,
        controllerAs: '$ctrl'
    })
    .result.then((createdMitarbeiter) => {
      this._addCreatedMitarbeiter(createdMitarbeiter);
    })
  }

  _addCreatedMitarbeiter(newMitarbeiter){
    let einsatzSummary = {
      mitarbeiter: newMitarbeiter,
      einsatze: [],
    }
    this.mitarbeiterEinsaetze.push(einsatzSummary);
  }

  createEinsatz(mitarbeiter, index){
      this.$uibModal.open({
          animation: true,
          template: createEinsatzTemplate,
          controller: createEinsatzController,
          bindToController: true,
          controllerAs: '$ctrl',
          resolve: {
              mitarbeiter: function(){
                  return mitarbeiter
              }
          }
      })
      .result.then((newEinsatz) => {
        this.projektService.getProjektFromEndpoint(newEinsatz._links.projekt.href)
          .then((response) => {
            let projektEinsatz = this._convertToProjektEinsatz(newEinsatz, response.data);
            this._addNewEinsatzToMitarbeiter(projektEinsatz, index);
          });
      });
  }

  _convertToProjektEinsatz(einsatz, projekt){
    return {
      einsatz: einsatz,
      projekt: projekt
    }
  }

  _addNewEinsatzToMitarbeiter(newEinsatz, index){
    let convertedEinsatz = this._convertProjektEinsatz(newEinsatz);
    this.mitarbeiterEinsaetze[index].einsatze.push(convertedEinsatz);
  }

  deleteEinsatz(einsatzId){
    //TODO kk: Call Backend when fixed
    /*
    this.einsatzService.deleteEinsatz(einsatzId)
      .then((data) => {
        console.log('Reponse', data.response);
      })
    */
    //This code comes inside the Callback
    this.mitarbeiterEinsaetze.forEach(mitarbeiterEinsatz => {
      mitarbeiterEinsatz.einsatze = mitarbeiterEinsatz.einsatze
        .filter(einatz => einatz.publicId !== einsatzId);
    });

  }

  deleteMitarbeiter(mitarbeiterUID){
    this.mitarbeiterService.deleteMitarbeiter(mitarbeiterUID)
      .$promise.then(() => {
        this.mitarbeiterEinsaetze = this.mitarbeiterEinsaetze.filter(mitarbeiterEinsatz =>
          mitarbeiterEinsatz.mitarbeiter.uid !== mitarbeiterUID);
      },
      (error) => {
        this.messagesService.errorMessage('Ooops!! beim Löschen ist ein Fehler aufgetreten', false);
      }
    )
  }
}

export default MitarbeiterEinsatzController;
