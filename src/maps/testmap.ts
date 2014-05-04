import Tiles = require("../tixel/tiles");

export class TestMap extends Tiles.TileMap {
    width:number;
    height:number;
    
    constructor(width = 10, height = 10) {
        super("assets/textures/tilemap.png");
        this.width = width;
        this.height = height;
    }
    
    tilesReady():void {
        var cube:THREE.Object3D;
        var z = 0;
        
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                cube = this.tileSet.random();
                z = (x === 0 || y === 0 || y === this.height-1 || x === this.width-1) ? 1 : 0;
                cube.position.set(x, z, y);
                this.add(cube);
            }
        }
        
        this.position.set(-this.width/2, 0, -this.height/2); 
    }
}
