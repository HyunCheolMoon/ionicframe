define([
    "angularAMD",
    "common",
    "util",
    "angular-ui-router"
], function (angularAMD, common, util) {

    "use strict";


    var app = angular.module("ionicFrameApp", ["ui.router", "ionic"]);
    app.run(function ($rootScope, $ionicPlatform, $ionicSideMenuDelegate) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            $rootScope.$on("$viewContentLoaded", function (scope) {
                var target = scope.targetScope;

                common.showLoading();

                target.activate && target.activate();
            });



            //$rootScope.$on("$ionicView.afterEnter", function (event) {
            //    $ionicSideMenuDelegate.canDragContent(true);
            //});
            //$rootScope.$on("$ionicView.beforeLeave", function (event) {
            //    $ionicSideMenuDelegate.canDragContent(false);
            //});
        });

        //$rootScope.$on("$stateChangeSuccess", function () {
        //});


    });
    angularAMD.directive("leftSide", function () {
        return {
            restrict: "E",
            templateUrl: "view/side.html",
            controller: "sideCtrl"
        };
    });
    angularAMD.directive("footer", function () {
        return {
            restrict: "E",
            templateUrl: "view/footer.html",
            controller: "footerCtrl"
        };
    });

    /**
     * @TODO config 분리 
     * @TODO resolve 데이터에 대한 처리  
     * @TODO hash 타입별 처리 및 모듈화  
     */
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/main/dashboard");
        $stateProvider
            .state("page", {
                url: "/:session/:page",
                templateUrl: function (hash) {
                    return "view/" + hash.session + "/" + hash.page + ".html";
                },
                resolve: {
                    load: ["$q", "$rootScope", "$stateParams", function ($q, $rootScope, $stateParams) {
                            var defer = $q.defer();
                            var param = $stateParams;


                            var session = param.session;
                            var controller = param.page;
                            var load = "controller/" + session + "/" + controller;

                            this.controller = session + util.transCamel(controller) + "Ctrl";

                            require([load], function () {
                                $rootScope.$apply(function (fn) {
                                    defer.resolve(load);
                                });
                            });
                            return defer.promise;
                        }]
                }
            })
            .state("loadpage", {
                url: "/:session/:page/:id",
                templateUrl: function (hash) {
                    return "view/" + hash.session + "/" + hash.page + ".html";
                },
                resolve: {
                    load: ["$q", "$rootScope", "$stateParams", function ($q, $rootScope, $stateParams) {
                            var defer = $q.defer();
                            var param = $stateParams;


                            var session = param.session;
                            var controller = param.page;
                            var load = "controller/" + session + "/" + controller;

                            this.controller = session + util.transCamel(controller) + "Ctrl";

                            require([load], function () {
                                $rootScope.$apply(function (fn) {
                                    defer.resolve(load);
                                });
                            });
                            return defer.promise;
                        }]
                }
            });
    });
    //app.config(function ($stateProvider, $urlRouterProvider) {
    //    $urlRouterProvider.otherwise("/dashboard");
    //    $stateProvider
    //        .state("main", angularAMD.route({
    //            url: "/main",
    //            templateUrl: "view/main.html",
    //            controller: "mainCtrl",
    //            controllerUrl: "controller/main"
    //        }))
    //        .state("dashboard", angularAMD.route({
    //            url: "/dashboard",
    //            templateUrl: "view/dashboard.html",
    //            controller: "dashboardCtrl",
    //            controllerUrl: "controller/dashboard"
    //        }));
    //});


    return angularAMD.bootstrap(app);
});
