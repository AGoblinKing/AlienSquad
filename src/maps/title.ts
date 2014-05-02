import Tiles = require("../tiles");

class TitleMap extends Tiles.TileMap {
    
    constructor() {
        super("assets/textures/tilemap.png");
 
        this.loadMap("assets/data/galvus.map");
    }
    
    mapLoaded() {
        this.position.set(-this.width/2, 0, 0);
    }
    
    update(delta:number) {
        this.children.forEach((tile) => {
            tile.rotation.x += (tile.position.x % 3 - 1 )* 0.08;
            tile.rotation.y += (tile.position.y % 3 - 1 )* 0.08;
        });
    }
}

export = TitleMap;