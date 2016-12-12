define(['app'], function (app) {
    "use strict";


    return app.controller('footerCtrl', function ($scope, $rootScope, $stateParams) {
        var self = $scope;
        self.active = "main";
        $rootScope.$on('$viewContentLoaded', function (scope) {
            self.active = $stateParams.page;
        });
        /***********************************************************************
         * 
         * 
         *                     event / action 
         * 
         * 
         /***********************************************************************
         * 
         * 
         *                      server request
         * 
         * 
         ***********************************************************************/
    });
});
