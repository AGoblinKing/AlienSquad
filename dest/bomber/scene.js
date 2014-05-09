var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bomber/../tixel"], function(require, exports, Txl) {
    var BaseMap = (function (_super) {
        __extends(BaseMap, _super);
        function BaseMap() {
            _super.call(this, "assets/textures/tilemap.png");
            this.loadMap("src/bomber/base.map");
        }
        BaseMap.prototype.mapLoaded = function () {
            this.entity.position.set(-this.width / 2 + 0.5, 0, -this.height / 2 + 0.5);
        };
        return BaseMap;
    })(Txl.TileMap);

    var Mover = (function (_super) {
        __extends(Mover, _super);
        function Mover() {
            _super.apply(this, arguments);
        }
        return Mover;
    })(Txl.Component);

    var Man = (function (_super) {
        __extends(Man, _super);
        function Man() {
            // add all my components here
            _super.call(this);
        }
        return Man;
    })(Txl.Entity);

    var Bomber = (function (_super) {
        __extends(Bomber, _super);
        function Bomber() {
            _super.call(this);
            this.addEntity(new Txl.Entity(new BaseMap()));
        }
        return Bomber;
    })(Txl.Scene);

    
    return Bomber;
});
