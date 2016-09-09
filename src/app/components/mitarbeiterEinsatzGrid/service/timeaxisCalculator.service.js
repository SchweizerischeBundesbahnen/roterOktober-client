class TimeaxisCalculator{

  constructor(){
    this.SECONDS_PER_DAY = 86400000;
  }

  calculateDayOfYear(dateString){
    let year = parseInt(dateString.substr(0, dateString.indexOf('-')));
    let date = Date.parse(dateString);
    var yearFirstDayTimestamp = new Date().setFullYear(year, 0, 1);
    var yearFirstDay = Math.floor(yearFirstDayTimestamp / this.SECONDS_PER_DAY);
    var dateInDays = Math.ceil(date / this.SECONDS_PER_DAY); //Calculates number of days since Unix Epoche January 1 - 1970
    return dateInDays - yearFirstDay;
  }

}

export default TimeaxisCalculator;
