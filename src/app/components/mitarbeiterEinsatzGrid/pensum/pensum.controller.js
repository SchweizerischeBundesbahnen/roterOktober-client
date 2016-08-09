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

            // Position pro Pensum berechnen
            for(var i = 0; i < this.pensen.length; i++) {
                this.calcPosition(this.pensen[i]);
            }
        });
    }

    calcPosition(pensum){
        // Range definieren, bis wir ihn aus einer zentralen Stelle beziehen können.
        var rangeStart = new Date("2016-01-01T00:00:00Z");
        var rangeEnd = new Date("2016-12-31T23:59:59Z");

        var rangeStartTime = rangeStart.getTime();
        var rangeEndTime = rangeEnd.getTime();
        var rangeDuration = rangeEndTime - rangeStartTime;

        // Linke Position berechnen. Wenn der Start kleiner als der Range ist,
        // dann ist es einfach
        var pensumAnfang = new Date(pensum.anfang);
        var pensumAnfangTime = pensumAnfang.getTime();
        if(pensumAnfangTime <= rangeStartTime) {
            pensum.startPosition = 0;
        } else {
            pensum.startPosition = (100 * (pensumAnfangTime - rangeStartTime)) / rangeDuration;
        }

        // Rechte Position berechnen. Dabei müssen wir berücksichtigen, dass diese
        // leer, sprich unendlich sein kann
        var pensumEnde = pensum.ende ? new Date(pensum.ende) : "";
        var pensumEndeTime = pensumEnde ? pensumEnde.getTime() : 0;
        if(!pensumEndeTime || pensumEndeTime > rangeEndTime) {
            pensum.endPosition = 100;
        } else {
            pensum.endPosition = (100 % (pensumEndeTime - rangeStartTime)) / rangeDuration;
        }

        pensum.widthPosition = pensum.endPosition - pensum.startPosition;
    }
}

export default PensumController;