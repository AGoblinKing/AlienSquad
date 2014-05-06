/// <reference path="../../ext/three.d.ts" />
import Utils = require("utils");
import Scene = require("scene");

// Should people ever extend this? no :/
class Game {
    renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias:true});
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight, 
        0.1, 
        10000
    );
    lastTime: number;
    scene: Scene;
    
    constructor() {
        Utils.WindowResize(this.renderer, this.camera);
        document.body.appendChild(this.renderer.domElement);
    }
    
    // just a nice wrapper
    start() { 
        this.lastTime = (new Date()).getTime(); 
        this.update(); 
        this.render();
    }
    
    // update ASAP
    update() {
        //this.setImmediate :(
        var currentTime = (new Date()).getTime();
        this.scene.update(currentTime - this.lastTime);
        this.lastTime = currentTime;
        setTimeout(() => this.update(), 0);
    }
    
    render() {
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }
}

export = Game;
