/// <reference path='../_all.ts' />
module lakers {

    export class PageApiService {

        private requestTemplate = {
            method: 'POST',
            url: 'http://localhost:9000/add/project',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Expose-Headers" : "*"
            },
            data: null
        };

        static $inject = ["$q", "$http"];

        constructor(private $q: ng.$q, private $http:ng.$http) {
        }

        private getPostHarRequestConfig(harPageModel:IHarPage){
            this.requestTemplate.data = this.getRequestData(harPageModel);
            return this.requestTemplate;
        }

        private getRequestData(harPageModel:IHarPage){
            var transformedJson = {
                projectName: harPageModel.projectName,
                workNotes: harPageModel.workNotes,
                harJson: JSON.parse(harPageModel.harJson)
            };

            return angular.toJson(transformedJson, false)
        }

        public postHarPage(harPageModel){
            return this.$http(this.getPostHarRequestConfig(harPageModel));
        }
    }

    app.service("pageApiService",PageApiService);
}
