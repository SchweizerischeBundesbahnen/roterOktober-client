import timeaxisModule from './timeaxisCalculator';
import TimeaxisCalculator from './timeaxisCalculator.service';

describe('TimeaxisCalculator', () => {
    let $rootScope, createService;

    beforeEach(window.module(timeaxisModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        createService = () => {
            return new TimeaxisCalculator();
        };
    }));

    describe('Servie', () => {
      it('should get 100% for 2017 if Pensum goes from 2015 to 2018', () => {
        let sut = createService();
        let convertedPensum = {"fromYear":2016,"startingDay":258,"untilYear":2018,"endingDay":37,"pensum":100};
        let selectedYear = 2017;
        expect(sut.getWidthForZeitachse(convertedPensum, selectedYear)).toBe(100);
      })
    })

});
