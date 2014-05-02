var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../tiles"], function(require, exports, Tiles) {
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
                    cube = this.tileSet.random();
                    z = (x === 0 || y === 0 || y === this.height - 1 || x === this.width - 1) ? 1 : 0;
                    cube.position.set(x, z, y);
                    this.add(cube);
                }
            }

            this.position.set(-this.width / 2, 0, -this.height / 2);
        };
        return TestMap;
    })(Tiles.TileMap);
    exports.TestMap = TestMap;
});
