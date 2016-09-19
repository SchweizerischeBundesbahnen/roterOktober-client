class ZeitachseController{

  /*@ngInject*/
  constructor(pensumConverter, timeaxisCalculatorService){
    this.pensumConverter = pensumConverter;
    this.timeaxisCalculator = timeaxisCalculatorService;
    this.convertedPensum = this.pensumConverter.convertPensum(this.pensum);
  }

  getZeitachseMargin(){
    return this.timeaxisCalculator.getZeitachseMargin(this.convertedPensum, this.selectedYear);
  }

  getWidthForZeitachse(){
    return this.timeaxisCalculator.getWidthForZeitachse(this.convertedPensum, this.selectedYear);
  }

  isYearOutsideEinsatz(){
    return this.timeaxisCalculator.isYearOutsideEinsatz(this.convertedPensum, this.selectedYear);
  }

}
export default ZeitachseController;
