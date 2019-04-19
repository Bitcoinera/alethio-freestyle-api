const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

gulp.task('gulp_nodemon', () => {
    nodemon({
        execMap: { 'ts': 'ts-node' },
        script: './server.ts',   
        watch: './*.ts',
        ignore: './app'
    });
});

// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        port: 3002,                      //this can be any port, it will show our app
        proxy: 'http://localhost:3001/', //this is the port where express server works
        ui: {port: 3003},                //UI, can be any port
        reloadDelay: 500
    });
});

gulp.watch(['./**/*.js', './**/*.html', './**/*.css']).on('change', browserSync.reload);

gulp.task('default', gulp.parallel('gulp_nodemon', 'browser-sync'));