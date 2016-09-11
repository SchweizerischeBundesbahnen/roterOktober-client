class TimeaxisCalculator{

  constructor(){
  }

  getZeitachseMargin(convertedPensum, selectedYear){
    if(this._isYearEqualToFromYear(convertedPensum, selectedYear)){
      return this._calculateMargin(convertedPensum);
    }
    else if (this._isYearAfterFromYear(convertedPensum, selectedYear)) {
      return '0';
    }
    return '100';
  }

  _isYearAfterFromYear(convertedPensum, selectedYear){
    return convertedPensum.fromYear < selectedYear;
  }

  _isYearEqualToFromYear(convertedPensum, selectedYear){
    return convertedPensum.fromYear === selectedYear;
  }

  _calculateMargin(convertedPensum){
    return 100 / 365 * convertedPensum.fromMonth;
  }

  getWidthForZeitachse(convertedPensum, selectedYear){
    if(this._isYearEqualToUntilYear(convertedPensum, selectedYear)){
      return this._calculateWidth(convertedPensum, selectedYear);
    }
    else if (this._isYearBeforeOrAfterPensum(convertedPensum, selectedYear)) {
      return '0';
    }
    return 100 - this.getZeitachseMargin(convertedPensum, selectedYear);
  }

  _isYearEqualToUntilYear(convertedPensum, selectedYear){
    return convertedPensum.untilYear === selectedYear;
  }

  _calculateWidth(convertedPensum, selectedYear){
    if(convertedPensum.fromYear === selectedYear){
      return 100 / 365 * (convertedPensum.untilMonth - convertedPensum.fromMonth);
    }
    if(convertedPensum.untilYear === selectedYear){
      return (100 / 365 * convertedPensum.untilMonth);
    }
    return '100';

  }

  _isYearBeforeOrAfterPensum(convertedPensum, selectedYear){
    return convertedPensum.untilYear < selectedYear || convertedPensum.fromYear > selectedYear;
  }

  isYearOutsideEinsatz(convertedPensum, selectedYear){
    return convertedPensum.untilYear >= selectedYear && convertedPensum.fromYear <= selectedYear;
  }
}

export default TimeaxisCalculator;
