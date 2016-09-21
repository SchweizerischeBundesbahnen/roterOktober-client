import angular from 'angular';

import pensumConverter from './pensumConverter.service';

export default angular.module('pensumConverterModule', [])
  .service('pensumConverter', pensumConverter);
