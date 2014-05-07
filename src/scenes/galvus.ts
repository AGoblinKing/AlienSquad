import Txl = require("../tixel");

class SubTitle extends Txl.TileMap {
    constructor() {
        super("assets/textures/tilemap.png");
        this.loadMap("assets/data/subtitles.map");
    }
    
    mapLoaded() {
        this.entity.position.set(-this.width/2, 0, 0);
    }
}

class TitleMap extends Txl.TileMap {
    constructor() {
        super("assets/textures/tilemap.png");
 
        this.loadMap("assets/data/galvus.map");
    }
    
    mapLoaded() {
        this.entity.position.set(-this.width/2, 0, -2);
    }
    
    update(delta:number) {
        this.entity.children.forEach((tile) => {
            tile.rotation.x += (tile.position.x % 3 - 1 )* 0.01 * delta;
            tile.rotation.y += (tile.position.y % 3 - 1 )* 0.01 * delta;
        });
    
        this.lerp += delta;
        var dX = Txl.Utils.easing.easeInBounce(this.lerp, 0, -300, 3000);
        this.entity.position.y = dX;
    } 
    lerp:number = 0;
}

class Galvus extends Txl.Scene {
    constructor(game:Txl.Game) {
        super();
        
        this.add(game.camera);
        this.addEntity(new Txl.Entity(new TitleMap()));
        //this.addEntity(new SubTitle());
        
        game.camera.position.y = 10;
        game.camera.rotation.x = -90 * Math.PI/180;
    }
}


export = Galvus;