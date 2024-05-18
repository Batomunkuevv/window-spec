export const map = () =>
    app.gulp
        .src(app.path.src.map, { sourcemaps: app.isDev })
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream());
