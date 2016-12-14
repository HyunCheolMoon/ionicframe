/* 
 Created on : 2016. 11. 3, PM 4:36:04
 Author     : Hyuncheol Moon 
 */
window.console = window.console || {
    log: function () {
    }
};
window.urlArgs = new Date().getTime();

bowerDir = "../bower/";
/* requires */
requirejs.config({
    urlArgs: "_=" + window.urlArgs,
    baseUrl: "js",
    paths: {
        "less": bowerDir + "less/dist/less",
        "jquery": bowerDir + "jquery/dist/jquery",
        "angular": bowerDir + "angular/angular",
        "angularAMD": bowerDir + "angularAMD/angularAMD",
        "angular-ui-router": bowerDir + "angular-ui-router/release/angular-ui-router",
        "firebase": bowerDir + "firebase/firebase",
        "util": "common/util",
        "bluetooth": "service/bluetooth",
        "common": "service/common",
        "app": "app",
        "side": "controller/side",
        "footer": "controller/footer"
    },
    shim: {
        "angularAMD": ["angular"],
        "angular-ui-router": ["angular"]
            //"angular-route": ["angular"]
    },
    deps: [
        "app",
        "jquery",
        "common",
        "side",
        "footer"
    ]
});
requirejs.onError = function (e) {
    if (e.requireType === "scripterror") {
        window.history.back();
        return;
    }
    console.log(e.requireType);
    console.log(e.stack);
    throw e;
};