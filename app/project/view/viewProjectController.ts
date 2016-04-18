/// <reference path='../../_all.ts' />


module lakers {
    'use strict';

    export class ViewProjectController {

        static $inject = ['$stateParams','projectService'];

        constructor(private $stateParams:any, private projectService:IProjectService) {
            console.log($stateParams.projectId);
            this.projectService.updateCurrentProject($stateParams.projectId)
        }

    }

    app.controller("viewProjectController", ViewProjectController);

}
