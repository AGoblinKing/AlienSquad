/// <reference path="../../ext/three.d.ts" />
import Entity = require("entity");

// Scene is kinda sorta an entity w/o components
class Scene extends THREE.Scene {
    entities: Entity.Entity[] = [];

    addEntity(entity: Entity.Entity) {
        this.entities.push(entity);
        this.add(entity);
        entity.send("sceneAdded", this);
    }
    
    removeEntity(entity: Entity.Entity) {
        var index = this.entities.indexOf(entity);
        if(index !== -1) {
            this.entities.splice(index, 1);
            this.remove(entity);
            entity.send("sceneRemoved", this);
        }
    }
    
    send(name:string, ...etc:any[]) {
        this.entities.forEach((entity) => { entity.send.apply(entity, [name].concat(etc)); } );
    } 
}

export = Scene;