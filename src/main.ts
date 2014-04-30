/// <reference path="../ext/three.d.ts" />
import Utils = require("utils");
import TestMap = require("testmap");

var renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias:true}),
    camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight, 
        0.1, 
        10000
    ),
    scene:THREE.Scene = new THREE.Scene(),
    controls = new THREE.OrbitControls(camera);

// Scene
scene.add(camera);
scene.add(new TestMap());

camera.position.z = 5;

// Render
function render() {    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
Utils.WindowResize(renderer, camera);
document.body.appendChild(renderer.domElement);
render(); 