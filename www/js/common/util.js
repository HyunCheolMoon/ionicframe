/**
 * 2016/10/12  문현철 
 */
define({
    /**
     * @param {Function} f
     * @returns {Function}
     * @description 빈 function  callback
     */
    dummyFunction: function () {
        return function () {
        };
    },
    /**
     * 
     * @param {Array} arr
     * @param {Object} o
     * @returns {Boolean}
     * @description 배열안에 이 값이 있는지 없는지 확인
     */
    is: function (arr, o) {
        if (!arr)
            return false;
        return arr.indexOf(o) !== -1;
    },
    /**
     * 
     * @param {Array} arr
     * @param {Object} o
     * @returns {unresolved}
     * @description 배열에서 삭제 확인
     */
    remove: function (arr, o) {
        if (!arr)
            return false;
        var index = arr.indexOf(o);
        return arr.splice(index, 1);
    },
    /**
     * 
     * @param {Number} num
     * @returns {String} num
     * @description 숫자에 0을 붙여서 return해줌   (예   1  -> "01")
     */
    insertZero: function (num) {

        num = parseInt(num);
        if (num < 10)
            num = "0" + num;
        return num.toString();
    },
    /**
     * 
     * @param {Number} value
     * @param {Number} total
     * @description 받은 값을 소수 두째자리까지의 퍼센테이지로 변환해서 반환
     * @returns {Number|util_L4.utilAnonym$0.getPercentage.percent}
     */
    getPercentage: function (value, total) {
        if (!value || !total)
            return 0;
        var percent = parseInt(value) / parseInt(total);
        return (percent * 100).toFixed(2);

    },
    /**
     * 
     * @param {Number} value 변환 값
     * @param {Number} num 자리수
     * @returns {undefined}
     */
    getRound: function (value, num) {
        if (!value || !num)
            return 0;
        if (isNaN(value) || isNaN(num))
            return "invalid type";
        var pow = Math.pow(10, num);

        return Math.round(value * pow) / pow;

    },
    /**
     * 
     * @param {Number} x
     * @returns {String}
     * @description 바이트 단위의 파일 사이즈를 단위에 맞게 변환후 반환
     */
    getFileSize: function (x) {
        var s = ["bytes", "kB", "MB", "GB", "TB", "PB"];
        var e = Math.floor(Math.log(x) / Math.log(1024));
        return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];

    },
    /**
     * 
     * @param {String} time  "00:00"
     * @description 24시간 형태의 시간을 받아 AM PM으로 구분
     */
    getTimeFormat: function (time) {
        var unit = "AM";
        var time = time.split(":");
        var hour = time[0];
        hour = parseInt(hour);
        if (hour >= 12) {
            hour -= hour === 12 ? 0 : 12;
            unit = "PM";
        }
        return {unit: unit, time: this.insertZero(hour) + ":" + time[1]};



    },
    /**
     * 
     * @param {String | Date} date
     * @returns {Number|String}
     * @description yyyy-mm-dd 형으로 변환
     */
    getDateFormat: function (date) {
        var d = new Date(date)
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = d.getDate().toString();
        return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
    },
    /**
     * @param {Number} page
     * @param {Number} total
     * @returns {Array}
     * @description 페이지의 값을 돌려준다 
     */
    pagination: function (page, total) {
        if (total === 0)
            return [1];
        var start = 0;
        var end = 0;
        start = page - 2;
        end = page + 3;
        var array = new Array();
        for (var i = start; i < end; i++) {
            if (i <= 0) {
                end++;
                continue;
            }
            if (i > total)
                break;
            array.push(i);
        }

        return array;
    },
    /**
     * 
     * @param {Object} data
     * @desciption data {key : value, key: value}
     * json data를 form data로 변경해준다
     */
    transForm: function (data) {
        var form = new FormData();
        for (var key in data)
            form.append(key, data[key]);
        return form;
    },
});

