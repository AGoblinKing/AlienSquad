/// <reference path="../ext/three.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Tiles = (function () {
        function Tiles(path) {
            var count = 5;

            this.tiles = [];

            for (var x = 1; x < count; x++) {
                var texture = THREE.ImageUtils.loadTexture(path);
                texture.anisotropy = 16;
                texture.repeat.set(1 / count, 1);
                texture.offset.set(x / count, 0);

                this.tiles.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: texture })));
            }
        }
        Tiles.prototype.random = function () {
            return this.tiles[Math.floor(Math.random() * this.tiles.length)].clone();
        };
        return Tiles;
    })();

    var TestMap = (function (_super) {
        __extends(TestMap, _super);
        function TestMap(width, height) {
            if (typeof width === "undefined") { width = 10; }
            if (typeof height === "undefined") { height = 10; }
            _super.call(this);
            this.tiles = new Tiles("assets/textures/tilemap.png");

            var cube;
            var z = 0;

            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    cube = this.tiles.random();
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
