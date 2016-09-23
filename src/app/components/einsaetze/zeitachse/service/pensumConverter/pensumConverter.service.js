export default class PensumConverter {

  constructor(){
    this.SECONDS_PER_DAY = 86400000;
  }

  convertPensen(pensen){
    let convertedPensen = [];
    pensen.forEach(pensum => {
      convertedPensen.push(this._convertPensum(pensum));
    })
    return convertedPensen;
  }

  _convertPensum(pensum){
    if(!pensum){
      return undefined;
    }
    let fromYear = parseInt(pensum.anfang.substr(0, pensum.anfang.indexOf('-')));
    let startingDay = this._calculateDayOfYear(pensum.anfang);
    let untilYear = pensum.ende ? parseInt(pensum.ende.substr(0, pensum.ende.indexOf('-'))) : 2099;
    let endingDay = pensum.ende ? this._calculateDayOfYear(pensum.ende) : 999999;
    let fromDate = this._convertDateStringToReadableDate(pensum.anfang);
    let untilDate = this._convertDateStringToReadableDate(pensum.ende);

    return {
      fromYear: fromYear,
      startingDay: startingDay,
      untilYear: untilYear,
      endingDay: endingDay,
      fromDate: fromDate,
      untilDate: untilDate,
      pensum: pensum.pensum,
      pensumId: pensum.publicId
    }
  }

  _convertDateStringToReadableDate(dateString){
    if(!dateString){
      return 'Unbestimmt';
    }

    let timestamp = Date.parse(dateString);
    let date = new Date(timestamp);

    if(date.getFullYear() === 2099){
      return 'Unbestimmt';
    }
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
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
