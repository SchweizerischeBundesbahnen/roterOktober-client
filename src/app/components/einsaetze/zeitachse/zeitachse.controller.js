class ZeitachseController{

  /*@ngInject*/
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

  getClass(pensum){
    if(!this.isSummary){
      return this.rowIndex % 2 === 0 ? 'progress-bar-success' : 'progress-bar-info';
    }
    else{
      if(pensum.pensum === 100){
        return 'progress-bar-warning progress-bar-striped';
      }
      if(pensum.pensum < 100){
        return 'progress-bar-success progress-bar-striped';
      }
      if(pensum.pensum > 100){
        return 'progress-bar-danger progress-bar-striped';
      }
    }
  }
}
export default ZeitachseController;
