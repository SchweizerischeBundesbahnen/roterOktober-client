import timeaxisCalculatorModule from './timeaxisCalculator';
import TimeaxisCalculator from './timeaxisCalculator.service';

describe('TimeAxisService', () => {
    let $rootScope, createService;

    beforeEach(window.module(timeaxisCalculatorModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        createService = () => {
            return new TimeaxisCalculator();
        };
    }));

    describe('Service', () => {
      it('should calculate the day of the year', () => {
        let service = createService();
        let dateString = '2016-04-12T22:00:00.000Z';
        let dayOfYear = service.calculateDayOfYear(dateString);
        expect(dayOfYear).toBe(103);
      });

      it('should calculate the day corresponding to the year', () => {
        let service = createService();
        let dateString = '2017-06-15T00:00:00.000Z';
        let dayOfYear = service.calculateDayOfYear(dateString);
        expect(dayOfYear).toBe(165);
      })
    });
});
