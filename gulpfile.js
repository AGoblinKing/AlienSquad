/*jslint node:true */
var gulp = require("gulp"),
    typescript = require('gulp-tsc'),
    through = require("through2"),
    path = require("path"),
    shelljs = require("shelljs"),
    static = require("node-static")

function relativeRequire(basePath) {
    var stream = through.obj(function(file, enc, callback) {
        if(file.isBuffer()) {
            var splits = path.dirname(file.path).split("tmps"),
                topLevel = splits[0] + "tmps\\" + splits[1].split("\\")[1];
            console.log(topLevel);
            var contents = file.contents.toString(enc),
                defines = /define\(\[([\"A-z"\, \.\\\/]*)\]/.exec(contents);
            
            if(defines && topLevel !== path.dirname(file.path)) {
                var defs = defines[1].split(", "),
                    relpath = path.dirname(file.path.replace(topLevel, ""));
                
                file.contents = new Buffer(contents.replace(defines[1], defs.map(function(define) {
                    if(['"require"', '"exports"'].indexOf(define) !== -1) {
                        return define;
                    } 
                    return ('"' + relpath.substr(1) + "/" + define.substr(1)).replace(/\\/g, "/");
                }).join(", ")), enc);
            }
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
    shelljs.rm("-rf", "../tmps/*");
    return gulp.src('src/**/*.ts')
        .pipe(typescript({ emitError: false, target: "ES5", tmpDir: "../tmps", "module": "amd" }))
        .pipe(relativeRequire("src/"))
        .pipe(gulp.dest('dest/'));
});
