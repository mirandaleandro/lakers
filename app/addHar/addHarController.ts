/// <reference path='../_all.ts' />


module lakers {
    'use strict';

    export class AddHarController {
        public harPageModel = {
            projectName: '',
            workNotes: '',
            harJson: ''
        };

        static $inject = ['$state', 'projectApiService'];

        constructor(private $state:any, private projectApi:IProjectApi) {
        }

        public submitAddPageForm() {
            this.projectApi.postHarPage(this.harPageModel)
                .then((response)=> {
                    debugger;
                    this.$state.go('viewProject',{projectId: response.data.id})
                })
                .catch((error)=> {
                    debugger;

                });
        }

    }

    app.controller("addHarController", AddHarController);

}
