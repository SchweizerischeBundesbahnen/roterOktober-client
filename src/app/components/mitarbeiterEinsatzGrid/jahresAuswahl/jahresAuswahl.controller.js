class jahresAuswahlController{

  constructor(){
    this.year = parseInt(new Date().getFullYear());
  }

  inkrementYear(){
    this.year++;
  }

  dekrementYear(){
    this.year--;
  }

}

export default jahresAuswahlController;
