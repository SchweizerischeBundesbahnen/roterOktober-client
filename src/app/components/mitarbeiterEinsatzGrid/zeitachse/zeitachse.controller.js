class ZeitachseController{

  constructor(){
  }

  getWidthForZeitachse(){
    if(this._isYearEqualToUntilYear()){
      return this._calculateWidth();
    }
    else if (this._isYearBeforeOrAfterPensum()) {
      return '0%';
    }
    return '100%';
  }

  _isYearEqualToUntilYear(){
    return this.pensum.untilYear === this.selectedYear;
  }

  _calculateWidth(){
    return 100/12 * (this.pensum.untilMonth - this.pensum.fromMonth) + '%';
  }

  _isYearBeforeOrAfterPensum(){
    return this.pensum.untilYear < this.selectedYear || this.pensum.fromYear > this.selectedYear;
  }

  isYearOutsideEinsatz(){
    return this.pensum.untilYear >= this.selectedYear && this.pensum.fromYear <= this.selectedYear;
  }

}
export default ZeitachseController;
