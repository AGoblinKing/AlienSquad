import Txl = require("../tixel");

class PNGMap extends Txl.Component {
    private img:HTMLImageElement;
    set image(img:HTMLImageElement) {
        this.img = img;
        this.createMap();
    }
    get image() {
        return this.img;    
    }
    // wow thats confusing
    data: {[key:string]:string};
    types = {
         "0,0,0" : new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xFFFFFFF}))
    }
    
    private createMap() {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        
        canvas.width = this.img.width;
        canvas.height = this.img.height;
        
        ctx.drawImage(this.img, 0, 0);
        
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height),
            data = imgData.data;
        
        this.data = {};
        // lets convert this over to a simple map
        for(var i = 0; i < data.length; i += 4) {
            var r = data[i+ 0],
                g = data[i+ 1],
                b = data[i+ 2],
                a = data[i+ 3],
                x =  (i/4) % canvas.width,
                y = Math.floor((i/4) / canvas.width),
                key = [x,y].join(","),
                value = [r, g, b].join(",");
            
            if(a !== 0) {
                this.data[key] = value;    
            }
        }
        
        // okay got a simple map, lets iterate over that
        Object.keys(this.data).forEach((key) => {
            var pos = key.split(","),
                color = this.data[key],
                type = this.types[color]; 
            
            if(type) {
                var obj = type.clone();
                console.log("adding new geom at ", pos);
                obj.position.set(pos[0], 0, pos[1]);
                this.entity.add(obj);
            }
            
        });
    }
    
    loadPNG(path:string) {
        Txl.Utils.LoadImage(path, (img:HTMLImageElement) => {
            this.image = img;    
        });
    }
    
    added() { 
        this.loadPNG("assets/map/rpg.png");
        
        // control geom
        this.entity.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xFFFFFFF})));
    }
}

class CamController extends Txl.Component {
    speed = 5;
    
    added() {
        var cam = Txl.Game.current.camera;
        cam.position.y = 44;
        cam.rotation.x = -90 * Math.PI/180;    
    }
    
    update(delta) {
        var cam = Txl.Game.current.camera,
            mod = delta/1000;
        
        if(Txl.c.Input.keys.w) {
            cam.position.z -= this.speed * mod; 
        } else if (Txl.c.Input.keys.s) {
            cam.position.z += this.speed * mod;
        }
        
        if(Txl.c.Input.keys.a) {
            cam.position.x -= this.speed * mod;    
        } else if(Txl.c.Input.keys.d) {
            cam.position.x += this.speed * mod;    
        }
    }
}

class Man extends Txl.Entity {
    constructor() {
        // add all my components here
        super(new CamController());    
    }
}

class RPG extends Txl.Scene {
    private map = new Txl.Entity(new PNGMap());
    private player = new Man();
    
    constructor() {
        super();
        this.addEntity(this.map);
        this.addEntity(this.player);
    }
}

export = RPG;