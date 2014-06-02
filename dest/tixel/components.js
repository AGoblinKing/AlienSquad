var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "tixel/components/tiles", "tixel/components/input"], function(require, exports, iTiles, Input) {
    exports.Input = Input;

    var TileMap = (function (_super) {
        __extends(TileMap, _super);
        function TileMap() {
            _super.apply(this, arguments);
        }
        return TileMap;
    })(iTiles.TileMap);
    exports.TileMap = TileMap;
    var Tiles = (function (_super) {
        __extends(Tiles, _super);
        function Tiles() {
            _super.apply(this, arguments);
        }
        return Tiles;
    })(iTiles.Tiles);
    exports.Tiles = Tiles;
});
