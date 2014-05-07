var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "tixel/game"], function(require, exports, Game) {
    // Scene is kinda sorta an entity w/o components
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.call(this);
            this.entities = [];
            this.add(this.game.camera);
        }
        Object.defineProperty(Scene.prototype, "game", {
            get: function () {
                return Game.current;
            },
            enumerable: true,
            configurable: true
        });

        Scene.prototype.addEntity = function (entity) {
            this.entities.push(entity);
            this.add(entity);
            entity.send("sceneAdded", this);
        };

        Scene.prototype.removeEntity = function (entity) {
            var index = this.entities.indexOf(entity);
            if (index !== -1) {
                this.entities.splice(index, 1);
                this.remove(entity);
                entity.send("sceneRemoved", this);
            }
        };

        Scene.prototype.send = function (name) {
            var etc = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                etc[_i] = arguments[_i + 1];
            }
            var args = [name].concat(etc);
            this.entities.forEach(function (entity) {
                entity.send.apply(entity, args);
            });
        };
        return Scene;
    })(THREE.Scene);

    
    return Scene;
});
