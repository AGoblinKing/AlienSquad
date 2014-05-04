import Game = require("tixel/game");
import TitleScene = require("scenes/galvus");

export class AlienSquad extends Game {
    constructor() {
        super();
        this.scene = new TitleScene(this);
        this.start();
    }
}

export var game = new AlienSquad();