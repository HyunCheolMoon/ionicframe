define(["app", "common"], function (app, common) {
    return app.controller("bluetoothMainCtrl", function ($scope) {
        var self = $scope;

        self.activate = function () {
            console.log("bluetoothMain page")
            common.hideLoading();
        };

    });
});