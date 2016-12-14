define(["jquery"], function ($) {

    var showLoading = function () {
        $("ion-spinner").show();
    };
    var hideLoading = function () {
        $("ion-spinner").hide();
    };

    return {
        showLoading: showLoading,
        hideLoading: hideLoading
    };




});
