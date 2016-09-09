export class MitarbeiterEinsatzController{

  constructor(/*ngInject*/ mitarbeiterService, einsatzService, timeaxisCalculatorService){
    this.mitarbeiterService = mitarbeiterService;
    this.einsatzService = einsatzService;
    this.timeaxisCalculatorService = timeaxisCalculatorService;
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
      mitarbeiterEinsatz.push({
        projekt: einsatz.projekt,
        pensum: this._convertToPensumdata(einsatz._embedded.pensen[0]), //TODO kk: Abklären warum es mehrere Pensen gibt
        rolle: einsatz.rolle,
        senioritaet: einsatz.senioritaet
      });
    });
    return mitarbeiterEinsatz;
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

}

export default MitarbeiterEinsatzController;
