/// <reference path="../ext/three.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Tiles = (function () {
        function Tiles(path, ready) {
            var _this = this;
            this.ready = false;
            this.tiles = [];

            // wanted to use a promise here but couldn't find a decent typescript lib
            var textMaster = THREE.ImageUtils.loadTexture(path, undefined, function () {
                // TODO: Make this handle more types of sprites maps
                var image = textMaster.image, count = image.width / image.height;

                for (var x = 1; x < count; x++) {
                    // Yeah could have cloned here but three.js is throwing up
                    var texture = THREE.ImageUtils.loadTexture(path);
                    texture.anisotropy = 16;
                    texture.repeat.set(1 / count, 1);
                    texture.offset.set(x / count, 0);

                    _this.tiles.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: texture, color: 0xFFFFFF })));
                }

                _this.ready = true;

                if (ready) {
                    ready();
                }
            });
        }
        Tiles.prototype.random = function () {
            return this.tiles[Math.floor(Math.random() * this.tiles.length)].clone();
        };
        return Tiles;
    })();
    exports.Tiles = Tiles;

    var TileMap = (function (_super) {
        __extends(TileMap, _super);
        function TileMap(path) {
            var _this = this;
            _super.call(this);
            this.tiles = new Tiles(path, function () {
                return _this.tilesReady();
            });
        }
        TileMap.prototype.tilesReady = function () {
        };
        return TileMap;
    })(THREE.Object3D);
    exports.TileMap = TileMap;

    var TestMap = (function (_super) {
        __extends(TestMap, _super);
        function TestMap(width, height) {
            if (typeof width === "undefined") { width = 10; }
            if (typeof height === "undefined") { height = 10; }
            _super.call(this, "assets/textures/tilemap.png");
            this.width = width;
            this.height = height;
        }
        TestMap.prototype.tilesReady = function () {
            var cube;
            var z = 0;

            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    cube = this.tiles.random();
                    z = (x === 0 || y === 0 || y === this.height - 1 || x === this.width - 1) ? 1 : 0;
                    cube.position.set(x, z, y);
                    this.add(cube);
                }
            }

            this.position.set(-this.width / 2, 0, -this.height / 2);
        };
        return TestMap;
    })(TileMap);
    exports.TestMap = TestMap;
});
