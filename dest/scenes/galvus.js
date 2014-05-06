var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "scenes/../tixel/scene", "scenes/../tixel/entity", "scenes/../tixel/components/tiles"], function(require, exports, Scene, Entity, Tiles) {
    var SubTitle = (function (_super) {
        __extends(SubTitle, _super);
        function SubTitle() {
            _super.call(this, "assets/textures/tilemap.png");
            this.loadMap("assets/data/subtitles.map");
        }
        SubTitle.prototype.mapLoaded = function () {
            this.entity.position.set(-this.width / 2, 0, 0);
        };
        return SubTitle;
    })(Tiles.TileMap);

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
            /*
            this.lerp += delta;
            var dX = Utils.easing.easeInBounce(this.lerp, 0, -300, 3000);
            this.position.y = dX;*/
        };
        return TitleMap;
    })(Tiles.TileMap);

    var Galvus = (function (_super) {
        __extends(Galvus, _super);
        function Galvus(game) {
            _super.call(this);

            this.add(game.camera);
            this.addEntity(new Entity.Entity(new TitleMap()));

            //this.addEntity(new SubTitle());
            game.camera.position.y = 10;
            game.camera.rotation.x = -90 * Math.PI / 180;
        }
        return Galvus;
    })(Scene);

    
    return Galvus;
});
