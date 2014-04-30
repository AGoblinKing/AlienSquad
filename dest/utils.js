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
});
