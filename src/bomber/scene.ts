import Txl = require("../tixel");

class BaseMap extends Txl.c.TileMap {
    constructor() {
        super("assets/textures/tilemap.png");
    }
    
    added() {
        console.log("loaded");
        this.loadMap("src/bomber/base.map"); 
        //Txl.Component.prototype.added.call(this);
    }
    
    mapLoaded() {
        this.entity.position.set(-this.width/2 + 0.5, 0, -this.height/2 + 0.5);
    }
}

class Man extends Txl.Entity {
    constructor() {
        // add all my components here
        super();    
    }
}

class Bomber extends Txl.Scene {
    constructor() {
        super();
        this.addEntity(new Txl.Entity(new BaseMap()));
    }
}

export = Bomber;