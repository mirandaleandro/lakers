/// <reference path='../_all.ts' />

module addHar {

    'use strict';

    export function addHarDirective():ng.IDirective {
        return {
            scope:{},
            controller: addHar.AddHarController,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: 'addHar/addHarTemplate.html',
            link: () => {
                console.log("directive loaded")
            }
        };
    }
}