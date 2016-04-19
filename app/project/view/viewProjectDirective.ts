/// <reference path='../../_all.ts' />

module lakers {
    'use strict';

    function viewProjectDirective():ng.IDirective {
        return {
            scope:{},
            controller: ViewProjectController,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: 'project/view/viewProjectTemplate.html'
        };
    }

    app.directive("lkViewProject", viewProjectDirective);
}
