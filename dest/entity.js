define(["require", "exports", "net"], function(require, exports, net) {
    var Entity = (function () {
        function Entity() {
        }
        Object.defineProperty(Entity.prototype, "position", {
            // Meta Programming wtb
            get: function () {
                return this.object3d.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "rotation", {
            get: function () {
                return this.object3d.rotation;
            },
            enumerable: true,
            configurable: true
        });

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
    })();
    
    return Entity;
});
