import Txl = require("tixel");
import TitleScene = require("scenes/galvus");
import RPGScene = require("rpg/scene");

class AlienSquad extends Txl.Game {
    constructor() {
        super();
        this.scene = new RPGScene();
        this.start();
    }
}

var game = new AlienSquad();