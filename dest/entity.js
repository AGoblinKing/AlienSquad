var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "net"], function(require, exports, net) {
    var texture = THREE.ImageUtils.loadTexture("assets/textures/wizard.png");

    var material = new THREE.SpriteMaterial({ map: texture, color: 0xdfdfff, fog: true });

    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            var _this = this;
            _super.call(this, material);
            this.keys = {};

            document.body.addEventListener("keydown", function (e) {
                _this.keys[String.fromCharCode(e.which).toLowerCase()] = true;
            });
            document.body.addEventListener("keyup", function (e) {
                _this.keys[String.fromCharCode(e.which).toLowerCase()] = false;
            });
        }
        Entity.prototype.update = function (delta) {
            if (this.dirty) {
            }

            if (this.keys.w) {
                this.position.z += -0.05;
            } else if (this.keys.s) {
                this.position.z += 0.05;
            }

            if (this.keys.a) {
                this.scale.x = -1;
                this.position.x += -0.05;
            } else if (this.keys.d) {
                this.scale.x = 1;
                this.position.x += 0.05;
            }
        };

        Entity.prototype.onData = function (data) {
            switch (data.type) {
                case 0 /* Update */:
                    this.unpack(data.payload);
                    break;
            }
        };

        Entity.prototype.unpack = function (args) {
            this.rotation.fromArray(args.rotation);
            this.position.fromArray(args.position);
        };

        Entity.prototype.pack = function () {
            return {
                position: this.position.toArray(),
                rotation: this.rotation.toArray()
            };
        };
        return Entity;
    })(THREE.Sprite);

    
    return Entity;
});
