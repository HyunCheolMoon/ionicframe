define(["app", "common", "bluetooth"], function (app, common) {
    return app.controller("bluetoothMainCtrl", function ($scope, $stateParams, bluetooth) {
        var self = $scope;
        var deviceID = "";

        self.activate = function () {
            deviceID = $stateParams.id;
            common.hideLoading();
            //bluetooth.connect(deviceID, function (res) {
            //    console.log(res)
            //    common.hideLoading();
            //});
        };


        self.disconnectBLE = function () {

            common.showLoading();
            bluetooth.disconnect(deviceID, function () {
                console.log(deviceID)
                common.hideLoading();
            });
        };

    });
});