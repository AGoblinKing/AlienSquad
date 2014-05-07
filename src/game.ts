import Txl = require("tixel");
import TitleScene = require("scenes/galvus");

class AlienSquad extends Txl.Game {
    constructor() {
        super();
        this.scene = new TitleScene(this);
        this.start();
    }
}

var game = new AlienSquad(); 