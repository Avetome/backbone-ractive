var browserify = require('browserify');
var debowerify = require('debowerify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var rigger = require('gulp-rigger');
var sourcemaps = require('gulp-sourcemaps');
var watchplugin = require('gulp-watch');
var opn = require('opn');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');

var config = {
    isProduction: false,

    build: {
        html: 'build/',
        js: 'build/js/',
        jslib: 'build/js/lib/',
        jsfile: "app.js",
        css: 'build/css',
    },
    
    src: {
        html: 'src/*.html',
        js: './src/js/main.js',
        less: 'src/less/index.less',
    },
    
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        less: 'src/less/**/*.less',        
    },
    
    clean: './build',

    localServer: {
        host: 'localhost',
        port: '9000'
    }
};

gulp.task('html:build', function() {
    gulp.src(config.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(config.build.html))
        .pipe(connect.reload());
});

gulp.task('less:build', function() {
    gulp.src(config.src.less)
        .pipe(sourcemaps.init())
        .pipe(less({ sourceMap: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.build.css))
        .pipe(connect.reload());
});

gulp.task('bootstrap_less:build', function() {
    gulp.src(config.src.bootstrap_less)
        .pipe(sourcemaps.init())
        .pipe(less({ sourceMap: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.build.css))
        .pipe(connect.reload());
});

gulp.task('js:build', function(    ) {
    var bundler = browserify({debug: true, extensions: ['.js']})
        .add(config.src.js)

    return bundler.bundle()
        .on('error', function (err) {
            console.log(err.message);
        })

        .pipe(source(config.build.jsfile))
        .pipe(gulp.dest(config.build.js));
});

gulp.task('watch', function(){
    watchplugin([config.watch.html], function(){
        gulp.start('html:build');
    });

    watchplugin([config.watch.less], function(){
        gulp.start('less:build');
    });

    watchplugin([config.watch.js], function(){
        gulp.start('js:build');
    });    
});

gulp.task('build', [
    'html:build',
    'less:build',
    'js:build'
]);

gulp.task('webserver', function(){
    connect.server({
        host: config.localServer.host,
        port: config.localServer.port,
        livereload: true,
    })    
});

gulp.task('openbrowser', function() {
    opn( 'http://' + config.localServer.host + ':' + config.localServer.port + '/build', 'chrome' );
});

gulp.task('clean', function(cb){
    rimraf(config.clean, cb);    
});

gulp.task('default', function() {
    return runSequence('build', 'watch', 'webserver', 'openbrowser');
});

gulp.task('rebuild', function(){
    return runSequence('clean', ['bootstrap_less:build', 'build'], 'watch', 'webserver', 'openbrowser');    
});

gulp.task('jenkins', function(){
    return runSequence('clean', ['bootstrap_less:build', 'build']);    
});
