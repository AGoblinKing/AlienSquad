var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "rpg/../tixel"], function(require, exports, Txl) {
    var PNGMap = (function (_super) {
        __extends(PNGMap, _super);
        function PNGMap() {
            _super.apply(this, arguments);
            this.types = {
                "0,0,0": new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xFFFFFFF }))
            };
        }
        Object.defineProperty(PNGMap.prototype, "image", {
            get: function () {
                return this.img;
            },
            set: function (img) {
                this.img = img;
                this.createMap();
            },
            enumerable: true,
            configurable: true
        });

        PNGMap.prototype.createMap = function () {
            var _this = this;
            var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");

            canvas.width = this.img.width;
            canvas.height = this.img.height;

            ctx.drawImage(this.img, 0, 0);

            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height), data = imgData.data;

            this.data = {};

            for (var i = 0; i < data.length; i += 4) {
                var r = data[i + 0], g = data[i + 1], b = data[i + 2], a = data[i + 3], x = (i / 4) % canvas.width, y = Math.floor((i / 4) / canvas.width), key = [x, y].join(","), value = [r, g, b].join(",");

                if (a !== 0) {
                    this.data[key] = value;
                }
            }

            // okay got a simple map, lets iterate over that
            Object.keys(this.data).forEach(function (key) {
                var pos = key.split(","), color = _this.data[key], type = _this.types[color];

                if (type) {
                    var obj = type.clone();
                    console.log("adding new geom at ", pos);
                    obj.position.set(pos[0], 0, pos[1]);
                    _this.entity.add(obj);
                }
            });
        };

        PNGMap.prototype.loadPNG = function (path) {
            var _this = this;
            Txl.Utils.LoadImage(path, function (img) {
                _this.image = img;
            });
        };

        PNGMap.prototype.added = function () {
            this.loadPNG("assets/map/rpg.png");

            // control geom
            this.entity.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xFFFFFFF })));
        };
        return PNGMap;
    })(Txl.Component);

    var CamController = (function (_super) {
        __extends(CamController, _super);
        function CamController() {
            _super.apply(this, arguments);
            this.speed = 5;
        }
        CamController.prototype.added = function () {
            var cam = Txl.Game.current.camera;
            cam.position.y = 44;
            cam.rotation.x = -90 * Math.PI / 180;
        };

        CamController.prototype.update = function (delta) {
            var cam = Txl.Game.current.camera, mod = delta / 1000;

            if (Txl.c.Input.keys.w) {
                cam.position.z -= this.speed * mod;
            } else if (Txl.c.Input.keys.s) {
                cam.position.z += this.speed * mod;
            }

            if (Txl.c.Input.keys.a) {
                cam.position.x -= this.speed * mod;
            } else if (Txl.c.Input.keys.d) {
                cam.position.x += this.speed * mod;
            }
        };
        return CamController;
    })(Txl.Component);

    var Man = (function (_super) {
        __extends(Man, _super);
        function Man() {
            // add all my components here
            _super.call(this, new CamController());
        }
        return Man;
    })(Txl.Entity);

    var RPG = (function (_super) {
        __extends(RPG, _super);
        function RPG() {
            _super.call(this);
            this.map = new Txl.Entity(new PNGMap());
            this.player = new Man();
            this.addEntity(this.map);
            this.addEntity(this.player);
        }
        return RPG;
    })(Txl.Scene);

    
    return RPG;
});
