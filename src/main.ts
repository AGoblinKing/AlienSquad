/// <reference path="../ext/three.d.ts" />
import Utils = require("utils");
import Tiles = require("tiles");
import Entity = require("entity");
import Title = require("maps/title");

var renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias:true}),
    camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight, 
        0.1, 
        10000
    ),
    scene:THREE.Scene = new THREE.Scene();

// Scene
var titleMap = new Title();

scene.add(camera);
scene.add(titleMap);

camera.position.y = 50;
camera.rotation.x = -90 * Math.PI/180;

// Render
function render() {    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    titleMap.update(0);
}

Utils.WindowResize(renderer, camera);
document.body.appendChild(renderer.domElement);
render(); 