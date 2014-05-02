/// <reference path="../ext/three.d.ts" />

export class Tiles { 
    tiles:THREE.Mesh[];
    ready:boolean = false;
    
    constructor(path:string, ready?:()=>void) {
        this.tiles = [];
        
        // wanted to use a promise here but couldn't find a decent typescript lib
        var textMaster:THREE.Texture = THREE.ImageUtils.loadTexture(path, undefined, () => {
            // TODO: Make this handle more types of sprites maps
            var image = <HTMLImageElement>textMaster.image,
                count = image.width / image.height;
            
            for(var x = 1; x < count; x++) {
                // Yeah could have cloned here but three.js is throwing up
                var texture = THREE.ImageUtils.loadTexture(path);
                texture.anisotropy = 16;
                texture.repeat.set(1/count, 1);
                texture.offset.set(x/count, 0);

                this.tiles.push(new THREE.Mesh(
                    new THREE.BoxGeometry(1,1,1),
                    new THREE.MeshBasicMaterial({map:texture, color: 0xFFFFFF})
                ));
            }
            
            this.ready = true;
            
            if(ready) {
                ready();
            }
        });
    }
    
    get(item:any):THREE.Mesh {
        switch(item) {
            case "r": 
                return this.random();
            case " ":
            case "x": 
                return undefined;
            default:
                var i = parseInt(item, 10);
                return this.tiles[i].clone();
        }
    }
    
    random():THREE.Mesh {
        return this.tiles[Math.floor(Math.random()*this.tiles.length)].clone();
    }
}

enum TMS { Unloaded, TilesLoading, TilesLoaded, MapLoading, MapLoaded }

export class TileMap extends THREE.Object3D {
    tileSet:Tiles;
    tiles: { [location:string]: THREE.Mesh } = {};
    
    width:number;
    height:number;
    
    private state:TMS = TMS.Unloaded;
    private mapPath:string;
    
    constructor(path:string) {
        super();
        this.state = TMS.TilesLoading;
        this.tileSet = new Tiles(path, () => this.tilesReady());
    }
    
    loadRAW(rawString:string) {
        var rawMap:string[][] = rawString.split("\r\n").map((row) => {
            return row.split("");    
        });
        
        this.loadData(rawMap);
    }
    
    loadCSV(csvString:string) {
        var rawMap:string[][] = csvString.split("\r\n").map((row) => {
            return row.split(",");    
        });
        
        this.loadData(rawMap);
    }
    
    loadData(mapData: string[][]) {
        mapData.forEach((row, y) => {
            this.width = row.length;
            row.forEach((item, x) => {
                this.setTile(x, y, item);
            });
        });
        this.height = mapData.length;
        this.mapLoaded();
    }
    
    getTile(x:number, y:number):THREE.Mesh {
        return this.tiles[x + "," + y];
    }
    
    setTile(x:number, y:number, type:string) {
        var pos = x + "," + y;
        
        if(this.tiles[pos]) {
            this.remove(this.tiles[pos]);
            delete this.tiles[pos];
        }
        
        var tile = this.tileSet.get(type);   
        if(tile) {
            tile.position.set(x, 0, y);
            this.add(tile);
            this.tiles[pos] = tile;
        }
    }
    
    mapLoaded() {}
    
    // ugh need promises
    private mapLoad() {
        this.state = TMS.MapLoading;
        var loader = new XMLHttpRequest();
        loader.open("GET", this.mapPath);
        loader.addEventListener("load", () => {
            var ext = this.mapPath.split(".")[1];
            switch(ext) {
                case "CSV":
                    this.loadCSV(loader.responseText);
                    break;
                default:
                    this.loadRAW(loader.responseText);
            }
            
        });
        loader.send();
    }
    
    loadMap(mapPath:string) {
        this.mapPath = mapPath;
        if(this.state === TMS.TilesLoaded) {
            this.mapLoad();
        }
    }
    
    tilesReady() {
        this.state = TMS.TilesLoaded;
        if(this.mapPath) {
            this.mapLoad();
        }
    }
}