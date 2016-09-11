export default class PensumConverter {

  constructor(){
    this.SECONDS_PER_DAY = 86400000;
  }

  convertPensum(pensum){
    if(!pensum){
      return undefined;
    }
    let fromYear = parseInt(pensum.anfang.substr(0, pensum.anfang.indexOf('-')));
    let fromMonth = this._calculateDayOfYear(pensum.anfang);
    let untilYear = parseInt(pensum.ende.substr(0, pensum.ende.indexOf('-')));
    let untilMonth = this._calculateDayOfYear(pensum.ende);

    return {
      fromYear: fromYear,
      fromMonth: fromMonth,
      untilYear: untilYear,
      untilMonth: untilMonth,
      pensum: pensum.pensum
    }
  }

  _calculateDayOfYear(dateString){
    let year = parseInt(dateString.substr(0, dateString.indexOf('-')));
    let date = Date.parse(dateString);
    var yearFirstDayTimestamp = new Date().setFullYear(year, 0, 1);
    var yearFirstDay = Math.floor(yearFirstDayTimestamp / this.SECONDS_PER_DAY);
    var dateInDays = Math.ceil(date / this.SECONDS_PER_DAY); //Calculates number of days since Unix Epoche January 1 - 1970
    return dateInDays - yearFirstDay;
  }
}
