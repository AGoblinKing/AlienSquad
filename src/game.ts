import Txl = require("tixel");
import TitleScene = require("scenes/galvus");
import BomberScene = require("bomber/scene");

class AlienSquad extends Txl.Game {
    constructor() {
        super();
        this.scene = new BomberScene();
        this.start();
        /*
        setTimeout(() => {
            this.scene = new BomberScene();
        }, 7000);*/
                
        this.camera.position.y = 14;    
        this.camera.rotation.x = -90 * Math.PI/180;
    }
}

var game = new AlienSquad();