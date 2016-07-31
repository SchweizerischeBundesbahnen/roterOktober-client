class PensumController {
    
    /*@ngInject*/
    constructor(pensumService) {
        this.pensumService = pensumService;
        
        // Pensen für den Einsatz laden
        this.pensen = [];
        this.loadPensen();
    }
    
    loadPensen(){
        this.pensumService.getPensenFromEinsatz(this.einsatz).then((data) => {
            this.pensen = data.data;
        });
    }
    
}

export default PensumController;