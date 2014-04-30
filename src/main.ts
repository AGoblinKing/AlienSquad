/// <reference path="../ext/three.d.ts" />
import Utils = require("utils");
import TestMap = require("testmap");
import Entity = require("entity");

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
var player = new Entity();
player.position.set(0, 1, 0);
scene.add(player);

camera.position.z = 5;

// Render
function render() {    
    player.update(0);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

Utils.WindowResize(renderer, camera);
document.body.appendChild(renderer.domElement);
render(); 