/// <reference path="../ext/three.d.ts" />
import net = require("net");

var texture = THREE.ImageUtils.loadTexture( "assets/textures/wizard.png" );

var material = new THREE.SpriteMaterial( { map: texture, color: 0xdfdfff, fog: true } );

class Entity extends THREE.Sprite {
    // Meta Programming wtb 
    uuid: String;
    dirty: Boolean;  
    keys: any = {};
    
    constructor() {
        super(material);
        
        document.body.addEventListener("keydown", (e) => {
            this.keys[String.fromCharCode(e.which).toLowerCase()]  = true;
        });
        document.body.addEventListener("keyup", (e) => {
            this.keys[String.fromCharCode(e.which).toLowerCase()]  = false;
        });
    }

    update(delta: Number) {
        if(this.dirty) { 
            
        }
        
        if(this.keys.w) {
            this.position.z += -0.05;
        } else if(this.keys.s) {
            this.position.z += 0.05;
        } 
        
        if(this.keys.a) {
            this.scale.x = -1;
            this.position.x += -0.05;
        } else if (this.keys.d) {
            this.scale.x = 1;
            this.position.x += 0.05;
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