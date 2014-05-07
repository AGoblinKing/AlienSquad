/// <reference path="../../ext/three.d.ts" />
import Game = require("game");

import Entity = require("entity");

// Scene is kinda sorta an entity w/o components
class Scene extends THREE.Scene {
    entities: Entity.Entity[] = [];
    
    get game():Game {
        return Game.current;
    }
    
    constructor() {
        super();
        this.add(this.game.camera);
    }
    
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
        var args = [name].concat(etc);
        this.entities.forEach((entity) => { entity.send.apply(entity, args); } );
    } 
}

export = Scene;