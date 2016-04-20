/// <reference path='_all.ts' />
/**
 * The main lakers app module.
 *
 * @type {angular.Module}
 */
module lakers {
    export var app = angular.module('lakers', ['ui.router', 'nvd3']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "home/homeTemplate.html"
            })
            .state('addPages', {
                url: "/add/pages",
                template: "<lk-add-har></lk-add-page>"
            })
            .state('viewProject', {
                url: "/view/project/:projectId",
                template: "<lk-view-project></lk-view-project>",
                resolve: {
                    fetchData: function ($stateParams, projectApiService:IProjectApi, projectService:IProjectService) {
                        return projectApiService.getProjectWithId($stateParams.projectId)
                            .then((result) => {
                                projectService.currentProject = result.data;
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                }
            });


        $urlRouterProvider.otherwise("/");
    });

    app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    })
}
