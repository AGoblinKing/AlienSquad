var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "tixel/game", "tixel/scene", "tixel/utils", "tixel/entity", "tixel/components/tiles"], function(require, exports, Game, Scene, Utils, iEntity, iTiles) {
    exports.Game = Game;
    exports.Scene = Scene;
    exports.Utils = Utils;

    // setting up a nice wrapper
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
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            _super.apply(this, arguments);
        }
        return Entity;
    })(iEntity.Entity);
    exports.Entity = Entity;
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.apply(this, arguments);
        }
        return Component;
    })(iEntity.Component);
    exports.Component = Component;
});
