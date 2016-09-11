import pensumConverterModule from './pensumConverter';
import PensumConverter from './pensumConverter.service';

describe('PensumConverter', () => {
    let $rootScope, createService;

    beforeEach(window.module(pensumConverterModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        createService = () => {
            return new PensumConverter();
        };
    }));

    describe('Service', () => {
      it('should calculate the day of the year', () => {
        let service = createService();
        let dateString = '2016-04-12T22:00:00.000Z';
        let dayOfYear = service._calculateDayOfYear(dateString);
        expect(dayOfYear).toBe(103);
      });

      it('should calculate the day corresponding to the year', () => {
        let service = createService();
        let dateString = '2017-06-15T00:00:00.000Z';
        let dayOfYear = service._calculateDayOfYear(dateString);
        expect(dayOfYear).toBe(165);
      })
    });
});
