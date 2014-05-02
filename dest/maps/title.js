var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../tiles"], function(require, exports, Tiles) {
    var TitleMap = (function (_super) {
        __extends(TitleMap, _super);
        function TitleMap() {
            _super.call(this, "assets/textures/tilemap.png");

            this.loadMap("assets/data/galvus.map");
        }
        TitleMap.prototype.mapLoaded = function () {
            this.position.set(-this.width / 2, 0, 0);
        };

        TitleMap.prototype.update = function (delta) {
            this.children.forEach(function (tile) {
                tile.rotation.x += (tile.position.x % 3 - 1) * 0.08;
                tile.rotation.y += (tile.position.y % 3 - 1) * 0.08;
            });
        };
        return TitleMap;
    })(Tiles.TileMap);

    
    return TitleMap;
});
