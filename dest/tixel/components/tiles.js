var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "tixel/components/../entity"], function(require, exports, Entity) {
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

                    // The materials should be configurable
                    _this.tiles.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: texture, color: 0xFFFFFF })));
                }

                _this.ready = true;

                if (ready) {
                    ready();
                }
            });
        }
        Tiles.prototype.get = function (item) {
            switch (item) {
                case "r":
                    return this.random();
                case " ":
                case "x":
                    return undefined;
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "1":
                case "0":
                    var i = parseInt(item, 10);
                    return this.tiles[i].clone();
                default:
                    return undefined;
            }
        };

        Tiles.prototype.random = function () {
            return this.tiles[Math.floor(Math.random() * this.tiles.length)].clone();
        };
        return Tiles;
    })();
    exports.Tiles = Tiles;

    var TMS;
    (function (TMS) {
        TMS[TMS["Unloaded"] = 0] = "Unloaded";
        TMS[TMS["TilesLoading"] = 1] = "TilesLoading";
        TMS[TMS["TilesLoaded"] = 2] = "TilesLoaded";
        TMS[TMS["MapLoading"] = 3] = "MapLoading";
        TMS[TMS["MapLoaded"] = 4] = "MapLoaded";
    })(TMS || (TMS = {}));

    var TileMap = (function (_super) {
        __extends(TileMap, _super);
        function TileMap(path) {
            var _this = this;
            _super.call(this);
            this.tiles = {};
            this.state = 0 /* Unloaded */;
            this.state = 1 /* TilesLoading */;
            this.tileSet = new Tiles(path, function () {
                return _this.tilesReady();
            });
        }
        TileMap.prototype.loadRAW = function (rawString) {
            var rawMap = rawString.split("\n").map(function (row) {
                return row.split("");
            });

            this.loadData(rawMap);
        };

        TileMap.prototype.loadCSV = function (csvString) {
            var rawMap = csvString.split("\n").map(function (row) {
                return row.split(",");
            });

            this.loadData(rawMap);
        };

        TileMap.prototype.loadData = function (mapData) {
            var _this = this;
            mapData.forEach(function (row, y) {
                _this.width = row.length;
                row.forEach(function (item, x) {
                    _this.setTile(x, y, item);
                });
            });
            this.height = mapData.length;
            this.mapLoaded();
        };

        TileMap.prototype.getTile = function (x, y) {
            return this.tiles[x + "," + y];
        };

        TileMap.prototype.setTile = function (x, y, type) {
            var pos = x + "," + y;

            if (this.tiles[pos]) {
                this.entity.remove(this.tiles[pos]);
                delete this.tiles[pos];
            }

            var tile = this.tileSet.get(type);

            if (tile) {
                tile.position.set(x, 0, y);
                this.entity.add(tile);
                this.tiles[pos] = tile;
            }
        };

        TileMap.prototype.mapLoaded = function () {
        };

        // ugh need promises
        TileMap.prototype.mapLoad = function () {
            var _this = this;
            this.state = 3 /* MapLoading */;
            var loader = new XMLHttpRequest();
            loader.open("GET", this.mapPath);
            loader.addEventListener("load", function () {
                var ext = _this.mapPath.split(".")[1], sanitized = loader.responseText.replace(/\r/g, "");
                switch (ext) {
                    case "CSV":
                        _this.loadCSV(sanitized);
                        break;
                    default:
                        _this.loadRAW(sanitized);
                }
            });
            loader.send();
        };

        TileMap.prototype.loadMap = function (mapPath) {
            this.mapPath = mapPath;
            if (this.state === 2 /* TilesLoaded */) {
                this.mapLoad();
            }
        };

        TileMap.prototype.tilesReady = function () {
            this.state = 2 /* TilesLoaded */;
            if (this.mapPath) {
                this.mapLoad();
            }
        };
        return TileMap;
    })(Entity.Component);
    exports.TileMap = TileMap;
});
