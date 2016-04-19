/// <reference path='../_all.ts' />
module lakers {

    export class ProjectService implements IProjectService {

        public currentProject:IProject;

        static $inject = ['projectApiService'];

        constructor(private projectApi:IProjectApi) {
        }

        public getFastestEntries(page:IPage, top:number = 5) {
            return page.entries.sort(this.sortFastestEntries).slice(0, top)
        }

        public getSlowestEntries(page:IPage, top:number = 5) {
            return page.entries.sort(this.sortSlowestEntries).slice(0, top)
        }

        private sortFastestEntries(el1:IEntry, el2:IEntry) {
            return el1.time - el2.time
        }

        private sortSlowestEntries(el1:IEntry, el2:IEntry) {
            return el2.time - el1.time
        }
    }

    app.service("projectService", ProjectService);
}
