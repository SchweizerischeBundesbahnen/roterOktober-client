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
    mitarbeiter.forEach((mitarbeiter, index) => {
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
    let mitarbeiterEinsatz = {
      mitarbeiter: mitarbeiter,
      einsatze: einsatze,
    }
    this.mitarbeiterEinsaetze.push(mitarbeiterEinsatz);
    console.log(einsatze);
  }
}

export default MitarbeiterEinsatzController;
