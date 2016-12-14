define(["app"], function (app) {
    return app.service("bluetooth", function () {
        var self = this;


        var executionModule = null;

        /**
         * 
         * @description 디바이스의 블루투스가 활성화 되어 있는지 확인
         */
        var activeCheckBluetooth = function () {

            ble.isEnabled(
                function (state) {
                    console.log(state)
                    getBluetoothList();
                },
                function (state) {
                    console.log(state)
                    enableBluetooth();

                });

        };

        self.initialize = function (module) {
            console.log(module)
            executionModule = module;

            activeCheckBluetooth();

        };

        /***********************************************************************
         * 
         * 
         *                       background 
         * 
         * 
         ***********************************************************************/

        /**
         * @state
         * 
         * "on"
         * "off"
         * "turningOn" (Android Only)
         * "turningOff" (Android Only)
         * "unknown" (iOS Only)
         * "resetting" (iOS Only)
         * "unsupported" (iOS Only)
         * "unauthorized" (iOS Only) 
         * 
         * @description 디바이스의 블루투스 상태에 대한 함수 실행 영역 
         */
        var activateStateCommander = function () {

            ble.startStateNotifications(function (state) {
                console.log(state)
                switch (state) {
                    case "on" :
                        break;
                    case "off" :
                        //enableBluetooth();
                        break;
                    default :
                        break;
                }
                console.log(state)

            });
        };

        /**
         * 
         * @description 상황별 명령자 비활성화 
         */
        var deactivateStateCommander = function () {

            ble.stopStateNotifications(
                function () {
                    console.log("stop")
                },
                function () {
                    console.log("fail")
                }
            );
        };



        /***********************************************************************
         * 
         * 
         *                     event / action 
         * 
         * 
         ***********************************************************************/


        self.connect = function (id, callback) {
            ble.connect(
                id,
                function (res) {
                    callback(res);
                },
                function (err) {
                    console.log(err)
                    alert('Something went wrong while trying to connect. Please try again');
                }
            );
        };

        /**
         * 
         * @description 블루투스 사용 할 수 있게 하는 선택창 활성화 
         */
        var enableBluetooth = function () {

            ble.enable(
                function () {
                    console.log("ok")
                    getBluetoothList();

                },
                function () {
                    console.log("cancel")
                }
            );

        };

        var getBluetoothList = function () {
            var scanDeviceList = [];
            ble.startScan([], function (device) {
                scanDeviceList.push(device);
                //console.log(JSON.stringify(device));
            }, function () {
                console.log("fail")

            });
            setTimeout(ble.stopScan, 5000,
                function () {
                    console.log("Scan complete");
                    executionModule.callList(scanDeviceList);
                    activateStateCommander();
                },
                function () {
                    console.log("stopScan failed");
                }
            );
        };


    });
});