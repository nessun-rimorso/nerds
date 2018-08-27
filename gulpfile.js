'use strict';

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('pug', function () {
    return gulp.src('source/pug/pages/*.pug')
        .pipe(gp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .on('end', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('source/sass/style.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass({
            'include css': true
        }))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions']
        }))
        .on('error', gp.notify.onError({
            title: "style"
        }))
        .pipe(gp.csso())
        .pipe(gulp.dest('dist/css'))
.
    pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('scripts', function () {
    return gulp.src('source/js/script.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('img', function () {
    return gulp.src('source/image/*.{jpeg,jpg,png,gif}')
        .pipe(gp.tinypng('gw9DvzLWL5I6Dxp6i1Se7ElH65QECcDP'))
        .pipe(gulp.dest('dist/image'));
});

gulp.task('watch', function () {
    gulp.watch('source/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('source/js/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass', 'scripts'),
    gulp.parallel('watch', 'serve')
));
    
