/// <reference path="../../ext/three.d.ts" />

export class Component {
    entity: Entity;
    // We can have ALL THE THINGS!
    [key:string]:any;
    
    constructor() { this.send("created"); }
    send(name:string, ...etc:any[]) {
        if(this[name]) {
            this[name].apply(this, etc);   
        }
    }
    
    destroy() { this.send("destroyed"); this.entity.removeComponent(this); }
}

export class Entity extends THREE.Object3D {
    components: Component[] = [];
    entities: Entity[] = [];
    parent: Entity;
    
    constructor(...components:Component[]) { 
        super();
        components.forEach((component) => {
            this.addComponent(component);    
        });
    }
    
    addEntity(entity:Entity) {
        this.entities.push(entity);
        this.add(entity);
        entity.parent = this;
        entity.send("adopted", this);
        this.send("adoptedChild", entity);
    }
    
    removeEntity(entity:Entity) {
        var index = this.entities.indexOf(entity);
        if(index !== -1) {
            this.remove(entity);
            this.entities.splice(index, 1);
            entity.parent = null;
            entity.send("orphaned", this);
            this.send("orphanedChild", entity);
        }
    }
    
    addComponent(component:Component) {
        this.components.push(component);
        component.entity = this;
        component.send("added");
        this.send("addedComponent", component);
    }
    
    // typescript doesn't let me use generics at run time
    getComponent<T extends Component>(type:(...etc:any[]) => Component):T {
        var toReturn:T;
        var found = this.components.some((component) => {
            if(typeof component === type.toString()) {
                toReturn = <T>component;
                return true;  
            } else {
                return false;  
            }
        });
        return toReturn;
    }
    
    removeComponent(component:Component) {
        var index = this.components.indexOf(component);
        if(index > -1) {
            this.components.splice(index, 1);
            component.send("removed");
            this.send("removedComponent", component);
        }
    }

    send(name:string, ...etc:any[]) {
        this.components.forEach((component) => {
            component.send(name, etc);    
        });
        this.entities.forEach((entity) => { entity.send.apply(entity, [name].concat(etc)); } );
    }  
}
