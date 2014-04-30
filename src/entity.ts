/// <reference path="../ext/three.d.ts" />
import net = require("net");

class Entity {
    // Meta Programming wtb 
    
    get position():THREE.Vector3 { return this.object3d.position; }
    get rotation():THREE.Euler { return this.object3d.rotation; }
    
    uuid: String;
    dirty: Boolean;
    object3d: THREE.Object3D;
    private material: THREE.Material;
    
    constructor() {}

    update(delta: Number) {
        if(this.dirty) { 
            
        }
    }
    
    onData(data:net.NetPacket) {
        switch(data.type) { 
            case net.NetPacketType.Update:
                this.unpack(data.payload);
                break;
        }
    }
    
    unpack(args:any) {
        this.rotation.fromArray(args.rotation);
        this.position.fromArray(args.position);
    }
    
    pack():any {
        return {
            position : this.position.toArray(),
            rotation : this.rotation.toArray()    
        }
    }
}
export = Entity;