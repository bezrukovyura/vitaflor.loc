let gulp = require('gulp');

let sourcemaps = require('gulp-sourcemaps');
let less = require('gulp-less');
const changed = require('gulp-changed');
let tsc = require('gulp-typescript');


var concat = require('gulp-concat');

gulp.task('concat', function () {
    return gulp.src([
        "./Scripts/jquery-3.3.1.min.js",
        "./Scripts/App.js",
        "./Scripts/slick.min.js",
        "./Scripts/jquery.waypoints.min.js",
        "./Scripts/jquery.mCustomScrollbar.concat.min.js",
        "./Scripts/css3-animate-it.js",
        "./Scripts/mustache.min.js"])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('Scripts'));
});


var clean = require('gulp-clean');
 
gulp.task('clean', function () {
    return gulp.src('./Scripts/all.js')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('Scripts'));
});


gulp.task('typescript', function () {
    return gulp.src('./Scripts/*.ts')
        .pipe(tsc({
            noImplicitAny: true,
            removeComments: true,
            preserveConstEnums: true,
            sourceMap: true,
            target: "ES6"
        }))
        .pipe(gulp.dest('./Scripts'));
});

gulp.task('less', function () {
    return gulp.src("./Styles/*.less")
        .pipe(less({}))
        .pipe(gulp.dest('./Styles'));
});

gulp.task('watch', function () {
    gulp.watch('./Scripts', debug ? ['typescript'] : ['scripts']);
    gulp.watch('./Styles', debug ? ['less'] : ['styles']);
});


gulp.task('default', ['typescript', 'less', 'concat']);

gulp.task('copy', function () {
    gulp.src('build/*.*').pipe(gulp.dest('_production/build'));
    gulp.src('fonts/**/*.*').pipe(gulp.dest('_production/fonts'));
    gulp.src('img/**/*.*').pipe(gulp.dest('_production/img'));
    gulp.src('php/**/*.*').pipe(gulp.dest('_production/php'));
    gulp.src(['*.php', '*.png', '*.txt', '*.xml']).pipe(gulp.dest('_production'));
});