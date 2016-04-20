/// <reference path='../_all.ts' />
module lakers {

    export class ProjectApiService {

        private requestTemplate = {
            method: 'POST',
            url: 'http://localhost:9000/add/project',
            headers: {
                'Content-Type': "application/json"
            },
            data: null
        };

        static $inject = ['$http'];

        constructor(private $http:any) {
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


        public getProjectWithId(projectId:string){
            return this.$http(
                {
                    method: 'GET',
                    url:'/proxy/localhost:9000/get/project/'+projectId
                }
            )
        }
    }

    app.service("projectApiService",ProjectApiService);
}
