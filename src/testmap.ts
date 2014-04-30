/// <reference path="../ext/three.d.ts" />

class Tiles { 
    tiles:THREE.Mesh[];
    constructor(path:string) {
        var count = 5;
        
        this.tiles = [];
        
        for(var x = 1; x < count; x++) {
            var texture:THREE.Texture = THREE.ImageUtils.loadTexture(path);
            texture.anisotropy = 16;
            texture.repeat.set(1/count, 1);
            texture.offset.set(x/count, 0);

            this.tiles.push(new THREE.Mesh(
                new THREE.BoxGeometry(1,1,1),
                new THREE.MeshBasicMaterial({map:texture})
            ));
        }
    }
    random():THREE.Mesh {
        return this.tiles[Math.floor(Math.random()*this.tiles.length)].clone();
    }
}

class TestMap extends THREE.Object3D {
    private tiles = new Tiles("assets/textures/tilemap.png");
    constructor(width = 10, height = 10) {
        super();
        
        var cube:THREE.Object3D;
        var z = 0;
        
        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                cube = this.tiles.random();
                z = (x === 0 || y === 0 || y === height-1 || x === width-1) ? 1 : 0;
                cube.position.set(x, z, y);
                this.add(cube);
            }
        }
        this.position.set(-width/2, 0, -height/2);
    }
}

export = TestMap;