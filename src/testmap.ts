/// <reference path="../ext/three.d.ts" />


// need a tile loader
var texture = THREE.ImageUtils.loadTexture("assets/textures/tilemap.png");
texture.anisotropy = 16;
texture.repeat.set(1/5, 1);
texture.offset.set(1/5, 0);

var material = new THREE.MeshBasicMaterial({map:texture});
var geom = new THREE.BoxGeometry(1,1,1);

class TestMap extends THREE.Object3D {
    constructor(width = 10, height = 10) {
        super();
        
        var cube:THREE.Object3D;
        var z = 0;
        
        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                cube = new THREE.Mesh(geom, material);
                z = (x === 0 || y === 0 || y === height-1 || x === width-1) ? 1 : 0;
                cube.position.set(x, z, y);
                this.add(cube);
            }
        }
        this.position.set(-width/2, 0, -height/2);
    }
}

export = TestMap;