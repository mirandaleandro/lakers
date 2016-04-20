/// <reference path='../_all.ts' />


module lakers {
    'use strict';

    export class AddHarController {

        public isSubmissionValid = true;

        public harPageModel = {
            projectName: '',
            workNotes: '',
            harJson: ''
        };

        static $inject = ['$state', 'projectApiService'];

        constructor(private $state:any, private projectApi:IProjectApi) {
        }

        public submitAddPageForm() {
            this.isSubmissionValid = true;

            try {

                this.projectApi.postHarPage(this.harPageModel)
                    .then((response)=> {
                        this.$state.go('viewProject', {projectId: response.data.id})
                    })
                    .catch((error)=> {
                        console.log("error");
                        this.isSubmissionValid = false;
                    });
            }catch(error){
                console.log("error");
                this.isSubmissionValid = false;
            }
        }

    }

    app.controller("addHarController", AddHarController);

}
