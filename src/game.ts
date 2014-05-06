import Game = require("tixel/game");
import TitleScene = require("scenes/galvus");

class AlienSquad extends Game {
    constructor() {
        super();
        this.scene = new TitleScene(this);
        this.start();
    }
}

var game = new AlienSquad(); 