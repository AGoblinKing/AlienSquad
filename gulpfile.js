/*jslint node:true */
var gulp = require("gulp"),
    typescript = require('gulp-tsc'),
    through = require("through2");
    
function relativeRequire() {
    var stream = through.obj(function(file, enc, callback) {
        if(file.isBuffer()) {
            console.log(file);    
        }
    });
    
    return stream;
}

gulp.task('default', function () {
    gulp.watch('src/**/*.ts', ['compile']);
});

// transform the relative requires over to based on their path
gulp.task('compile', function () {
    return gulp.src('src/**/*.ts')
        .pipe(typescript({ emitError: false, tmpDir: "..", target: "ES5", "module": "amd" }))
        .pipe(relativeRequire())
        .pipe(gulp.dest('dest/'));
});
