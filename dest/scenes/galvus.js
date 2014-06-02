var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "scenes/../tixel"], function(require, exports, Txl) {
    var TitleMap = (function (_super) {
        __extends(TitleMap, _super);
        function TitleMap() {
            _super.call(this, "assets/textures/tilemap.png");
            this.lerp = 0;

            this.loadMap("assets/data/galvus.map");
        }
        TitleMap.prototype.mapLoaded = function () {
            this.entity.position.set(-this.width / 2, 0, -2);
        };

        TitleMap.prototype.update = function (delta) {
            this.entity.children.forEach(function (tile) {
                tile.rotation.x += (tile.position.x % 3 - 1) * 0.01 * delta;
                tile.rotation.y += (tile.position.y % 3 - 1) * 0.01 * delta;
            });

            this.lerp += delta;
            var dX = Txl.Utils.easing.easeInBounce(this.lerp, 0, -300, 5000);
            this.entity.position.y = dX;
        };
        return TitleMap;
    })(Txl.c.TileMap);

    var Bomber = (function (_super) {
        __extends(Bomber, _super);
        function Bomber() {
            _super.apply(this, arguments);
            // if there already is input, don't add another.. dislike instantiating it tho
            // TODO: better way of allowing sharing of component instances and setting arguments to them
            this.requires = [new Txl.c.Input()];
        }
        return Bomber;
    })(Txl.Component);

    var Galvus = (function (_super) {
        __extends(Galvus, _super);
        function Galvus() {
            _super.call(this);
            this.addEntity(new Txl.Entity(new TitleMap()));
        }
        return Galvus;
    })(Txl.Scene);

    
    return Galvus;
});
