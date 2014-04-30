/// <reference path="../ext/three.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    // need a tile loader
    var texture = THREE.ImageUtils.loadTexture("assets/textures/tilemap.png");
    texture.anisotropy = 16;
    texture.repeat.set(1 / 5, 1);
    texture.offset.set(1 / 5, 0);

    var material = new THREE.MeshBasicMaterial({ map: texture });
    var geom = new THREE.BoxGeometry(1, 1, 1);

    var TestMap = (function (_super) {
        __extends(TestMap, _super);
        function TestMap(width, height) {
            if (typeof width === "undefined") { width = 10; }
            if (typeof height === "undefined") { height = 10; }
            _super.call(this);

            var cube;
            var z = 0;

            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    cube = new THREE.Mesh(geom, material);
                    z = (x === 0 || y === 0 || y === height - 1 || x === width - 1) ? 1 : 0;
                    cube.position.set(x, z, y);
                    this.add(cube);
                }
            }
            this.position.set(-width / 2, 0, -height / 2);
        }
        return TestMap;
    })(THREE.Object3D);

    
    return TestMap;
});
