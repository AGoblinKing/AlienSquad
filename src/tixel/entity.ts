/// <reference path="../../ext/three.d.ts" />
import net = require("net");

class Entity extends THREE.Object3D {
    // Meta Programming wtb  
    uuid: String; 
    dirty: Boolean;  
    
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