import angular from "angular";
import template from "./mitarbeiter.html";
import controller from "./mitarbeiter.controller.js";
import uiRouter from "angular-ui-router";

let mitarbeiterModule = angular.module('mitarbeiter', [uiRouter])

    .config(/*@ngInject*/($stateProvider) => {
        $stateProvider.state('mitarbeiter', {
            url: '/mitarbeiter', template: '<mitarbeiter></mitarbeiter>'
        });
    })

    .component('mitarbeiter', {
        template,
        controller
    });

export default mitarbeiterModule;