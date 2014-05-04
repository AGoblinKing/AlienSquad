var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "net"], function(require, exports, net) {
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            _super.apply(this, arguments);
        }
        Entity.prototype.update = function (delta) {
            if (this.dirty) {
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
    })(THREE.Object3D);

    
    return Entity;
});
