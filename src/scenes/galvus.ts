// okay this is super annoying
import Scene = require("../tixel/scene");
import Game = require("../tixel/game");
import Entity = require("../tixel/entity");
import Tiles = require("../tixel/components/tiles");
import Utils = require("../tixel/utils");

class SubTitle extends Tiles.TileMap {
    constructor() {
        super("assets/textures/tilemap.png");
        this.loadMap("assets/data/subtitles.map");
    }
    
    mapLoaded() {
        this.entity.position.set(-this.width/2, 0, 0);
    }
}

class TitleMap extends Tiles.TileMap {
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
        /*
        this.lerp += delta;
        var dX = Utils.easing.easeInBounce(this.lerp, 0, -300, 3000);
        this.position.y = dX;*/
    } 
    lerp:number = 0;
}

class Galvus extends Scene {
    constructor(game:Game) {
        super();
        
        this.add(game.camera);
        this.addEntity(new Entity.Entity(new TitleMap()));
        //this.addEntity(new SubTitle());
        
        game.camera.position.y = 10;
        game.camera.rotation.x = -90 * Math.PI/180;
    }
}


export = Galvus;