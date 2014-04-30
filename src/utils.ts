/// <reference path="../ext/three.d.ts" />
export function WindowResize(renderer:THREE.WebGLRenderer, camera:THREE.PerspectiveCamera) {
    function HandleResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", HandleResize, false);
    
    HandleResize();
    return {
        stop : function() { window.removeEventListener("resize", HandleResize); }    
    };
}
