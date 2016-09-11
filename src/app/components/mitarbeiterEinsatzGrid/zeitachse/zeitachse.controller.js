class ZeitachseController{

  constructor(){
  }

  getZeitachseMargin(){
    if(this._isYearEqualToFromYear()){
      return this._calculateMargin();
    }
    else if (this._isYearAfterFromYear()) {
      return '0 %';
    }
    return '100%';
  }

  _isYearAfterFromYear(){
    return this.pensum.fromYear < this.selectedYear;
  }

  _isYearEqualToFromYear(){
    return this.pensum.fromYear === this.selectedYear;
  }

  _calculateMargin(){
    return 100 / 365 * this.pensum.fromMonth;
  }

  getWidthForZeitachse(){
    if(this._isYearEqualToUntilYear()){
      return this._calculateWidth();
    }
    else if (this._isYearBeforeOrAfterPensum()) {
      return '0%';
    }
    return 100 - this.getZeitachseMargin() + '%';
  }

  _isYearEqualToUntilYear(){
    return this.pensum.untilYear === this.selectedYear;
  }

  _calculateWidth(){
    if(this.pensum.fromYear === this.selectedYear){
      return 100 / 365 * (this.pensum.untilMonth - this.pensum.fromMonth) + '%';
    }
    return 100 / 365 * this.pensum.untilMonth + '%';
  }

  _isYearBeforeOrAfterPensum(){
    return this.pensum.untilYear < this.selectedYear || this.pensum.fromYear > this.selectedYear;
  }

  isYearOutsideEinsatz(){
    return this.pensum.untilYear >= this.selectedYear && this.pensum.fromYear <= this.selectedYear;
  }

}
export default ZeitachseController;
