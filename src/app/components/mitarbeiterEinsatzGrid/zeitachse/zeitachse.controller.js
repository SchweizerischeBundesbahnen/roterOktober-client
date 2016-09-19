class ZeitachseController{

  constructor(pensumConverter, timeaxisCalculatorService){
    console.log('I am rendered with', this.pensen);
    this.pensumConverter = pensumConverter;
    this.timeaxisCalculator = timeaxisCalculatorService;
    this.convertedPensen = this.pensumConverter.convertPensen(this.pensen);
    this.$onChanges = () => console.log('Hallo');
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
