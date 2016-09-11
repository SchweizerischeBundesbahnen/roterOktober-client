import createMitarbeiterController from "./mitarbeiterEdit/mitarbeiterEdit.controller";
import createMitarbeiterTemplate from "./mitarbeiterEdit/mitarbeiterEdit.html";
import createEinsatzController from "./einsatzCreate/einsatzCreate.controller";
import createEinsatzTemplate from "./einsatzCreate/einsatzCreate.html";

class MitarbeiterEinsatzController{

  constructor(/*ngInject*/ mitarbeiterService, einsatzService, timeaxisCalculatorService, $uibModal){
    this.mitarbeiterService = mitarbeiterService;
    this.einsatzService = einsatzService;
    this.timeaxisCalculatorService = timeaxisCalculatorService;
    this.$uibModal = $uibModal;
    this.mitarbeiter = [];
    this.year = parseInt(new Date().getFullYear());
    this.mitarbeiterEinsaetze = [];
    this.loadMitarbeiter();
  }

  loadMitarbeiter(){
    this.mitarbeiterService.getAllMitarbeiter()
      .then((response) => {
        this.mitarbeiter = response.data;
        this._getEinsatzeForMitarbeiter(this.mitarbeiter);
      });
  }

  _getEinsatzeForMitarbeiter(mitarbeiter){
    mitarbeiter.forEach((mitarbeiter) => {
      this.einsatzService.getEinsatzForMitarbeiter(mitarbeiter.uid)
        .then((response) => {
          let einsatze = response.data;
          this._createMitarbeiterEinsatz(mitarbeiter, einsatze);
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

  _createMitarbeiterEinsatz(mitarbeiter, einsatze){
    let mitarbeiterEinsatze = this._convertEinsatze(einsatze);
    let einsatzSummary = {
      mitarbeiter: mitarbeiter,
      einsatze: mitarbeiterEinsatze,
    }
    this.mitarbeiterEinsaetze.push(einsatzSummary);
  }

  _convertEinsatze(einsatze){
    let mitarbeiterEinsatz = [];
    einsatze.forEach((einsatz) => {
      mitarbeiterEinsatz.push(this._convertEinsatz(einsatz));
    });
    return mitarbeiterEinsatz;
  }

  _convertEinsatz(einsatz){
    return {
      projekt: einsatz.projekt,
      pensum: einsatz._embedded.pensen[0], //TODO kk: Müssen wir noch mehrere Einsätze unterstützen
      senioritaet: einsatz.senioritaet
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
        this._addNewEinsatzToMitarbeiter(newEinsatz, index);
      });
  }

  _addNewEinsatzToMitarbeiter(newEinsatz, index){
    let convertedEinsatz = this._convertEinsatz(newEinsatz);
    this.mitarbeiterEinsaetze[index].einsatze.push(convertedEinsatz);
  }
}

export default MitarbeiterEinsatzController;
