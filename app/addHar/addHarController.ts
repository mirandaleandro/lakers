/// <reference path='../_all.ts' />


module lakers {
    'use strict';

    export class AddHarController {
        public harPageModel = {
            projectName: '',
            workNotes: '',
            harJson: ''
        };

        static $inject = ['pageApiService'];
        //
        constructor(private pageApi:any) {
        }

        public submitAddPageForm() {
            this.pageApi.postHarPage(this.harPageModel)
                .then((pages)=> {
                    debugger;
                })
                .catch((error)=> {
                    debugger;

                });
        }

    }

    app.controller("addHarController", AddHarController);

}
