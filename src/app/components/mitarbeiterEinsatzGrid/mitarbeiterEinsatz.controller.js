export class MitarbeiterEinsatzController{

  constructor(/*ngInject*/ mitarbeiterService, einsatzService){
    this.mitarbeiterService = mitarbeiterService;
    this.einsatzService = einsatzService;
    this.mitarbeiter = [];

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
    console.log(this.mitarbeiterEinsaetze);
  }

  _convertEinsatze(einsatze){
    let mitarbeiterEinsatz = [];
    einsatze.forEach((einsatz) => {
      mitarbeiterEinsatz.push({
        projekt: einsatz.projekt,
        pensum: this._convertToPensumdata(einsatz.pensen[0]) //TODO kk: Abklären warum es mehrere Pensen gibt
      });
    });
    return mitarbeiterEinsatz;
  }

  _convertToPensumdata(pensum){
    let fromYear = pensum.anfang.substr(0, pensum.anfang.indexOf('-'));
    let fromMonth = parseInt(pensum.anfang.substr(pensum.anfang.indexOf('-') + 1, pensum.anfang.lastIndexOf('-'))) - 1;
    let untilYear = pensum.ende.substr(0, pensum.ende.indexOf('-'));
    let untilMonth = parseInt(pensum.ende.substr(pensum.ende.indexOf('-') + 1, pensum.ende.lastIndexOf('-')));

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
