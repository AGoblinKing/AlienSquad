/// <reference path="../../ext/three.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Component = (function () {
        function Component() {
            this.requires = [];
            this.send("created");
        }
        Component.prototype.added = function () {
            this.requires.forEach(this.entity.addComponent.bind(this.entity));
        };

        Component.prototype.send = function (name) {
            var etc = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                etc[_i] = arguments[_i + 1];
            }
            if (this[name]) {
                this[name].apply(this, etc);
            }
        };

        Component.prototype.destroy = function () {
            this.send("destroyed");
            this.entity.removeComponent(this);
        };
        return Component;
    })();
    exports.Component = Component;

    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            var components = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                components[_i] = arguments[_i + 0];
            }
            _super.call(this);
            this.components = [];
            this.entities = [];
            components.forEach(this.addComponent.bind(this));
        }
        Entity.prototype.addEntity = function (entity) {
            this.entities.push(entity);
            this.add(entity);
            entity.parent = this;
            entity.send("adopted", this);
            this.send("adoptedChild", entity);
        };

        Entity.prototype.removeEntity = function (entity) {
            var index = this.entities.indexOf(entity);
            if (index !== -1) {
                this.remove(entity);
                this.entities.splice(index, 1);
                entity.parent = null;
                entity.send("orphaned", this);
                this.send("orphanedChild", entity);
            }
        };

        Entity.prototype.checkInstances = function (type) {
            return !this.components.every(function (component) {
                return component.constructor === type;
            });
        };

        Entity.prototype.addComponent = function (component) {
            this.components.push(component);
            component.entity = this;
            component.send("added");
            this.send("addedComponent", component);
        };

        Entity.prototype.getComponent = function (type) {
            var toReturn;
            var found = this.components.some(function (component) {
                if (component instanceof type) {
                    toReturn = component;
                    return true;
                } else {
                    return false;
                }
            });
            return toReturn;
        };

        Entity.prototype.removeComponent = function (component) {
            var index = this.components.indexOf(component);
            if (index > -1) {
                this.components.splice(index, 1);
                component.send("removed");
                this.send("removedComponent", component);
            }
        };

        Entity.prototype.send = function (name) {
            var etc = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                etc[_i] = arguments[_i + 1];
            }
            var args = [name].concat(etc);
            this.components.forEach(function (component) {
                component.send.apply(component, args);
            });

            this.entities.forEach(function (entity) {
                entity.send.apply(entity, args);
            });
        };
        return Entity;
    })(THREE.Object3D);
    exports.Entity = Entity;
});
