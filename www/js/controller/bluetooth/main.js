define(["app", "common", "bluetooth"], function (app, common) {
    return app.controller("bluetoothMainCtrl", function ($scope, $stateParams, bluetooth, $location) {
        var self = $scope;


        self.device = null;

        self.activate = function () {
            common.hideLoading();
            self.device = bluetooth.profile.get();
            setDevice();
        };
        self.date = null;
        self.level = null;

        var setDevice = function () {
            var d = self.device;

            var char = {};
            for (var i in d.characteristics) {
                var c = d.characteristics[i];
                char[c.characteristic] = c;
            }
            console.log(char)
            bluetooth.read(d.id, char["2a01"].service, char["2a01"].characteristic);
            bluetooth.startNoti(d.id, char["a7fe5e14-de71-4020-b2cf-8bf764fb0a8d"].service, char["a7fe5e14-de71-4020-b2cf-8bf764fb0a8d"].characteristic, function (res) {
                console.log(res);
                var dateType = res[0];
                var year = ((0x0f & res[1]) << 8) | (0x00ff & res[0]);
                var month = res[2];
                var day = res[3];
                var hour = res[4];
                var minute = res[5];
                var second = res[6];
                var level = res[7];

                var type = String.format("%02X ", res[1]).trim().charAt(0);
                var isRealTime = false;
                switch (type) {
                    case '0'://real, normal
                        isRealTime = true;
                        type = "real, normal";
                        break;
                    case '1'://real, sudden
                        isRealTime = true;
                        isSuddenData = true;
                        type = "real, sudden";
                        break;
                    case '8'://saved, normal
                        isRealTime = false;
                        type = "saved, normal";
                        break;
                    case '9'://saved, sudden
                        isRealTime = false;
                        isSuddenData = true;
                        type = "saved, sudden";
                        break;
                }
                console.log(type)

                self.type = dateType;
                self.date = year + "-" + month + "-" + day + ", " + hour + ":" + minute + ":" + second;
                self.level = level;


                $scope.$apply();

            });
        };



        self.disconnectBLE = function () {

            common.showLoading();
            bluetooth.disconnect(self.device.id, function () {
                common.hideLoading();
                self.device = null;
                $location.path("/bluetooth/list");
                $scope.$apply();
            });
        };

    });
});