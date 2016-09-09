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
      pensum: this._convertToPensumdata(einsatz._embedded.pensen[0]), //TODO kk: Müssen wir noch mehrere Einsätze unterstützen
      senioritaet: einsatz.senioritaet
    };
  }

  _convertToPensumdata(pensum){
    let fromYear = parseInt(pensum.anfang.substr(0, pensum.anfang.indexOf('-')));
    let fromMonth = this.timeaxisCalculatorService.calculateDayOfYear(pensum.anfang);
    let untilYear = parseInt(pensum.ende.substr(0, pensum.ende.indexOf('-')));
    let untilMonth = this.timeaxisCalculatorService.calculateDayOfYear(pensum.ende);

    return {
      fromYear: fromYear,
      fromMonth: fromMonth,
      untilYear: untilYear,
      untilMonth: untilMonth,
      pensum: pensum
    }
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

  createEinsatz(index){
      let vm = this;
      this.$uibModal.open({
          animation: true,
          template: createEinsatzTemplate,
          controller: createEinsatzController,
          bindToController: true,
          controllerAs: '$ctrl',
          resolve: {
              mitarbeiter: function(){
                  return vm.mitarbeiter
              }
          }
      })
      .result.then((newEinsatz) => {
        this._addNewEinsatzToMitarbeiter(newEinsatz, index);
      });
  }

  _addNewEinsatzToMitarbeiter(newEinsatz, index){
    console.log('New Einsatz', newEinsatz);
    console.log('Index', index);
    let convertedEinsatz = this._convertEinsatz(newEinsatz);
    this.mitarbeiterEinsaetze[index].einsatze.push(newEinsatz);
  }
}

export default MitarbeiterEinsatzController;
