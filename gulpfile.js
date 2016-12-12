var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
//var bower = require("gulp-bower");
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var less = require("gulp-less");

/**
 * @description less를 css로 변환
 */
gulp.task("less", function () {
    return gulp.src("./**/ionicframe.less")
        .pipe(less())
        .pipe(gulp.dest("./"));
});



gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});



///* 기존 bower의 업데이트를 이용하기 위한 ... 아직 안해봄 */
//gulp.task("bower", function () {
//    return bower({cmd: "update"})
//        .pipe(gulp.dest("bower/"));
//});
//gulp.task('bower', function () {
//    return bower({cmd: 'update'});
//});


gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
        process.exit(1);
    }
    done();
});
