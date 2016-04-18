/// <reference path='../_all.ts' />

module lakers {

    'use strict';

    function addHarDirective():ng.IDirective {
        return {
            scope:{},
            controller: AddHarController,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: 'addHar/addHarTemplate.html',
            link: () => {
                console.log("directive loaded")
            }
        };
    }

    app.directive("lkAddHar", addHarDirective);

}
