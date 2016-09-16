class ZeitachseController{

  constructor(pensumConverter, timeaxisCalculatorService){
    this.pensumConverter = pensumConverter;
    this.timeaxisCalculator = timeaxisCalculatorService;
    this.convertedPensen = this.pensumConverter.convertPensen(this.pensen);
  }

  getZeitachseMargin(pensum){
    return this.timeaxisCalculator.getZeitachseMargin(pensum, this.selectedYear);
  }

  getWidthForZeitachse(pensum){
    return this.timeaxisCalculator.getWidthForZeitachse(pensum, this.selectedYear);
  }

  isYearOutsideEinsatz(pensum){
    return this.timeaxisCalculator.isYearOutsideEinsatz(pensum, this.selectedYear);
  }

}
export default ZeitachseController;
