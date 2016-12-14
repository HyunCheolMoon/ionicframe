define(["app", "common", "bluetooth"], function (app, common) {
    return app.controller("bluetoothListCtrl", function ($scope, $location, $stateParams, bluetooth) {
        var self = $scope;

        self.bluetoothList = [];

        self.activate = function () {
            console.log("bluetooth page");
            common.hideLoading();
            console.log($location, $stateParams)
        };


        var callbluetoothList = function (list) {
            self.bluetoothList = list;
            console.log(list)
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
        self.connectBLE = function (id) {
            bluetooth.connect(id, function(res){
                console.log($state)
                console.log(res)
                alert(JSON.stringify(res));

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