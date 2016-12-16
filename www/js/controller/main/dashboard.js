define(["app", "common"], function (app, common) {
    return app.controller("mainDashboardCtrl", function ($scope) {
        var self = $scope;

        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
        self.activate = function () {
            console.log("dashboard page")
            common.hideLoading();
            var a = 23;
//            a = 7;
            a = new String(a)
            console.log(a)
            var type = a.format("%02X", a);
            console.log(type)
        };

    });
});