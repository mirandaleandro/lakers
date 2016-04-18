/// <reference path='../_all.ts' />


module addHar {
    'use strict';


    export class AddHarController {
        //public projectName:string = '';
        //public workNote:string = '';
        //public harJson:string = '';
        public harPageModel = {
            projectName: '',
            workNotes: '',
            harJson: ''
        };

        static $inject = ['pageApiService'];
        //
        constructor(private pageApi:any){
           debugger;
        }

        public submitAddPageForm() {
            debugger;
            this.pageApi.postHarPage(this.harPageModel);
        }

    }
}
