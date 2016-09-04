export class MitarbeiterEinsatzController{

  constructor(/*ngInject*/ mitarbeiterService){
    this.mitarbeiterService = mitarbeiterService;
    this.mitarbeiter = [];
    this.loadMitarbeiter();
  }

  loadMitarbeiter(){
    /*
    this.mitarbeiterService.getAllMitarbeiter()
      .then((response) => {
        this.mitarbeiter = response.data;
      });
    */

    this.einsaetze = [
      {
        mitarbeiter: {
          vorname: 'Kevin',
          name: 'Kreuzer'
        },
        projekte: [
          {
            projektname: 'Test',
            dauer: 2
          },
          {
            projektname: 'Blub',
            dauer: 3
          },
          {
            projektname: 'Blab',
            dauer: 4
          }
        ]
      },
      {
        mitarbeiter: {
          vorname: 'Stefan',
          name: 'Urech'
        },
        projekte: [
          {
            projektname: 'WebShop',
            dauer: 2
          },
          {
            projektname: 'Foo',
            dauer: 3
          },
          {
            projektname: 'Blab',
            dauer: 4
          }
        ]
      }
    ]

  }
}

export default MitarbeiterEinsatzController;
