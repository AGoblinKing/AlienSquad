/*jslint node:true */
var gulp = require("gulp"),
    typescript = require('gulp-tsc'),
    through = require("through2"),
    path = require("path"),
    shelljs = require("shelljs"),
    static = require("node-static"),
    topLevel;

function relativeRequire(basePath) {
    var stream = through.obj(function(file, enc, callback) {
        if(file.isBuffer() && topLevel) {
            var contents = file.contents.toString(enc),
                defines = /define\(\[([\"A-z"\, \\\/]*)\]/.exec(contents);
            
            if(defines) {
                var defs = defines[1].split(", "),
                    relpath = path.dirname(file.path.replace(topLevel, ""));
                
                file.contents = new Buffer(contents.replace(defines[1], defs.map(function(define) {
                    if(['"require"', '"exports"'].indexOf(define) !== -1) {
                        return define;
                    } 
                    return ('"' + relpath.substr(1) + "/" + define.substr(1)).replace(/\\/g, "/");
                }).join(", ")), enc);
            }
        } else {
            if(!topLevel) topLevel = path.dirname(file.path);  
        }
        
        this.push(file);
        return callback();
    });
    
    return stream;
}

var fileServer = new static.Server();
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8080);

gulp.task('default', ["compile"], function () {
    gulp.watch('src/**/*.ts', ['compile']);
});

// transform the relative requires over to based on their path
gulp.task('compile', function () {
    shelljs.rm("-rf", "dest/*");
    return gulp.src('src/**/*.ts')
        .pipe(typescript({ emitError: false, tmpDir: "..", target: "ES5", "module": "amd" }))
        .pipe(relativeRequire("src/"))
        .pipe(gulp.dest('dest/'));
});
