define(["require", "exports"], function(require, exports) {
    /// <reference path="../ext/three.d.ts" />
    function WindowResize(renderer, camera) {
        function HandleResize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        window.addEventListener("resize", HandleResize, false);

        HandleResize();
        return {
            stop: function () {
                window.removeEventListener("resize", HandleResize);
            }
        };
    }
    exports.WindowResize = WindowResize;
    function GenerateGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    exports.GenerateGUID = GenerateGUID;
});
