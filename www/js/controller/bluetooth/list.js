define(["app", "common", "bluetooth"], function (app, common) {
    return app.controller("bluetoothListCtrl", function ($scope, $location, $stateParams, bluetooth) {
        var self = $scope;

        self.bluetoothList = [];

        self.activate = function () {
            console.log("bluetooth page");
            common.hideLoading();
        };


        var callbluetoothList = function (list) {
            self.bluetoothList = [];
            for (var i in list) {
                var l = list[i];
                if (!l.name)
                    continue;
                self.bluetoothList.push(l);
            }
            common.hideLoading();
            $scope.$apply();
        };





        /***********************************************************************
         * 
         * 
         *                     event / action 
         * 
         * 
         ***********************************************************************/

        /**
         * 
         * @description 블루투스 디바이스를 불러온다
         */
        self.getBLEDevice = function () {
            common.showLoading();
            bluetooth.initialize({
                callList: callbluetoothList
            });

        };
        /**
         * 
         * @description 블루투스 디바이스 connection
         */
        self.connectBLE = function (id) {
            console.log(id)

            common.showLoading();
            bluetooth.connect(id, function (res) {

                common.hideLoading();
                $location.path("/bluetooth/main/" + res.id);
                $scope.$apply();

            });
        };



        /***********************************************************************
         * 
         * 
         *                      server request
         * 
         * 
         ***********************************************************************/






    });
});