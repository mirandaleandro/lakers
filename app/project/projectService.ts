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

        private sortFastestEntries(el1:IEntry, el2:IEntry) {
            return el1.time - el2.time
        }

        public getSlowestEntries(page:IPage, top:number = 5) {
            return page.entries.sort(this.sortSlowestEntries).slice(0, top)
        }

        private sortSlowestEntries(el1:IEntry, el2:IEntry) {
            return el2.time - el1.time
        }

        public getMostEfficientEntries(page:IPage, top:number = 5){
            return page.entries.sort( (entry1, entry2) => {
                    return this.sortMostEfficient(entry1, entry2)
                }
            ).slice(0, top);
        }

        private sortMostEfficient(el1:IEntry, el2:IEntry) {
            return this.getEntryEfficiency(el2) - this.getEntryEfficiency(el1);
        }

        public getMostInEfficientEntries(page:IPage, top:number = 5){
            return page.entries.sort(
                (entry1, entry2) => {
                    return this.sortMostInEfficient(entry1, entry2)
                }).slice(0, top);
        }

        private sortMostInEfficient(el1:IEntry, el2:IEntry) {
            debugger;
            return this.getEntryEfficiency(el2) - this.getEntryEfficiency(el1);
        }

        public getEntryEfficiency(entry:IEntry){
debugger;
            return entry.response.transferSize / entry.time;
        }

    }

    app.service("projectService", ProjectService);
}
