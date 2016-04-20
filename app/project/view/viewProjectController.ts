/// <reference path='../../_all.ts' />


module lakers {
    'use strict';

    export class ViewProjectController {

        public project:IProject;
        public fastestToLoad = [];
        public slowestToLoad = [];
        public typesOfResourcesLoaded = [];
        public percentageOfResourcesLoaded = [];

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

        public pieCharConfiguration = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        static $inject = ['$scope', '$stateParams', 'projectService'];

        constructor(private $scope, private $stateParams:any, private projectService:IProjectService) {
            this.project = this.projectService.currentProject;
            this.generateCharts();
        }

        public generateCharts(){
            this.generateFastestCallsCharts();
            this.generateSlowestCallsCharts();
            this.generateResourceTypeCharts();
            this.generateResourceTypePercentageCharts();
        }

        public generateFastestCallsCharts() {
            this.project.pages.forEach((page) =>{
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

        public generateSlowestCallsCharts() {
            this.project.pages.forEach((page) =>{
                var slowestEntriesPerPage = this.projectService.getSlowestEntries(page, 5);

                var data =  [{
                    "key": "Slowest resources to load",
                    "color": "#1f77b4",
                    "values": slowestEntriesPerPage.map(this.getLabelValueForEntry)
                }];

                this.slowestToLoad.push({
                    options: this.multiBarHorizontalChartConfiguration,
                    data: data
                })
            });
        }

        public generateResourceTypeCharts() {
            this.project.pages.forEach((page:IPage) =>{
                var mimeValues = this.countMimeType(page.entries);

                this.typesOfResourcesLoaded.push(mimeValues);
            });
        }

        public generateResourceTypePercentageCharts() {
            this.project.pages.forEach((page:IPage) =>{
                var mimeValues = this.countMimeType(page.entries);

                mimeValues = this.mapMimeValuesToPercentage(mimeValues);

                this.percentageOfResourcesLoaded.push(mimeValues);
            });
        }

        public mapMimeValuesToPercentage(mimeValues){
            var total = _.reduce(_.pluck(mimeValues,"y"), function(memo, num){ return memo + num; }, 0);

            return mimeValues.map((value) =>{
                value.y = value.y/total * 100;
                return value;
            });
        }

        public countMimeType(entries:Array<IEntry>){
            var countMimeType = {};

            entries.forEach((entry:IEntry) =>{
                if(countMimeType[entry.response.mimeType]){
                    countMimeType[entry.response.mimeType].y++
                }
                else{
                    countMimeType[entry.response.mimeType] = {
                        key:entry.response.mimeType,
                        y:1
                    }
                }
            });

            var mimeValues = [];
            for(var mimeKey in countMimeType){
                mimeValues.push(countMimeType[mimeKey]);
            }

            return mimeValues;
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
