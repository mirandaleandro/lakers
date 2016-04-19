/// <reference path='../../_all.ts' />


module lakers {
    'use strict';

    export class ViewProjectController {

        public project:IProject;
        public fastestToLoad = [];
        public slowestToLoad = [];

        public multiBarHorizontalChartConfiguration = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    return d.value;
                },
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };

        static $inject = ['$scope', '$stateParams', 'projectService'];

        constructor(private $scope, private $stateParams:any, private projectService:IProjectService) {
            debugger;
            this.project = this.projectService.currentProject;
            this.generateFastestCallsCharts();
        }

        public generateFastestCallsCharts() {

            this.project.pages.forEach((page, pageIndex) =>{
                var fastestEntriesPerPage = this.projectService.getFastestEntries(page, 5);

                var data =  [{
                    "key": "Fastest resources to load",
                    "color": "#d62728",
                    "values": fastestEntriesPerPage.map(this.getLabelValueForEntry)
                }];

                this.fastestToLoad.push({
                    options: this.multiBarHorizontalChartConfiguration,
                    data: data
                })
            });
        }



        private getLabelValueForEntry(entry:IEntry){
            return {
                label: entry.request.url,
                value: entry.time
            }
        }

    }

    app.controller("viewProjectController", ViewProjectController);

}
