define(["app", "common"], function (app, common) {
    return app.controller("mainDashboardCtrl", function ($scope) {
        var self = $scope;

        self.activate = function () {
            console.log("dashboard page")
            common.hideLoading();
        };

    });
});