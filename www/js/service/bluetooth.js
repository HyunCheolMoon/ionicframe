define(["app"], function (app) {
    return app.service("bluetooth", function () {
        var self = this;


        var executionModule = null;



        var profile = null;
        self.profile = {
            set: function (obj) {
                profile = obj;
            },
            get: function () {
                if (profile === null)
                    return false;
                return profile;
            },
            del: function () {
                profile = null;
                return true;
            }
        };


        self.initialize = function (module) {
            executionModule = module;

            activeCheckBluetooth();

        };

        /***********************************************************************
         * 
         * 
         *                       background event 
         * 
         * 
         ***********************************************************************/

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
         *                     bluetooth device event (service) 
         * 
         * 
         ***********************************************************************/
        function stringToBytes(string) {
            var array = new Uint8Array(string.length);
            for (var i = 0, l = string.length; i < l; i++) {
                array[i] = string.charCodeAt(i);
            }
            return array.buffer;
        }

        function arrayToBuffer(buffer) {
            var arr = new Uint8Array(buffer);
            //var str = String.fromCharCode.apply(null, new Uint8Array(buffer));
            return arr;
        }
        self.read = function (id, service, characteristic) {
            console.log("read")
            ble.read(id, service, characteristic,
                function (res) {
                    console.log(arrayToBuffer(res))
                },
                function (err) {
                    console.log(err)

                }
            );
        };

        self.startNoti = function (id, service, characteristic, callback) {
            console.log("noticestart")
            ble.startNotification(id, service, characteristic, function (res) {
                console.log(res)
                var b = arrayToBuffer(res);
                callback(b);
            },
                function (err) {
                    console.log(err)

                }
            );
        };

        /***********************************************************************
         * 
         * 
         *                     mobile device event (connect)
         * 
         * 
         ***********************************************************************/


        /**
         * 
         * @description 블루투스 DEVICE와 연결 
         */
        self.connect = function (id, callback) {
            ble.connect(
                id,
                function (res) {
                    self.profile.set(res);
                    callback(res);
                },
                function (err) {
                    alert('Something went wrong while trying to connect. Please try again');
                }
            );
        };
        /**
         * 
         * @description 블루투스 DEVICE와 연결 해제
         */
        self.disconnect = function (id, callback) {
            ble.disconnect(
                id,
                function () {
                    self.profile.del();
                    callback();
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
            setTimeout(ble.stopScan, 4000,
                function () {
                    executionModule.callList(scanDeviceList);
                    activateStateCommander();
                },
                function () {
                }
            );
        };






    });
});