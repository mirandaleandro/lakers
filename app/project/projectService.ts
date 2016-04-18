/// <reference path='../_all.ts' />
module lakers {

    export class ProjectService {

        public currentProject:IProject;

        static $inject = ['projectApiService'];

        constructor(private projectApi:IProjectApi) {
        }

        public updateCurrentProject(projectId:string):void {
            this.projectApi.getProjectWithId(projectId)
                .then((response) => {
                    debugger;
                    this.currentProject = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    app.service("projectService", ProjectService);
}
