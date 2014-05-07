import Txl = require("../tixel");

class BaseMap extends Txl.TileMap {
    constructor() {
        super("assets/textures/tilemap.png");
 
        this.loadMap("src/bomber/base.map");    
    }
    
    mapLoaded() {
        this.entity.position.set(-this.width/2, 0, -this.height/2);
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