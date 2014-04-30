/*jslint node:true */
var gulp = require("gulp"),
    typescript = require('gulp-tsc');

gulp.task('default', function () {
    gulp.watch('src/**/*.ts', ['compile']);
});

gulp.task('compile', function () {
    return gulp.src('src/**/*.ts')
        .pipe(typescript({ emitError: false, tmpDir: "..", target: "ES5", "module": "amd" }))
        .pipe(gulp.dest('dest/'));
});
