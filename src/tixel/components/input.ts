import Entity = require("../entity");

class Mouse {
    down:boolean;
    x:number;
    y:number;
}

class Input extends Entity.Component {
    // perhaps this should be generic?
    created() {
        Input.instances.push(this);    
    }
    
    destroyed() {
        Input.instances.splice(Input.instances.indexOf(this), 1);    
    }

    static mouse:Mouse = new Mouse();
    static keys:any = {};
    static instances: Input[] = [];
    static convertCode(code:number) {
        switch(code) {
            case 8: return "backspace";
            case 9: return "tab";
            case 13: return "enter";
            case 16: return "shift";
            case 17: return "ctrl";
            case 18: return "alt";
            case 19: return "pause";
            case 20: return "capslock";
            case 27: return "escape";
            case 33: return "pageup";
            case 34: return "pagedown";
            case 35: return "end";
            case 36: return "home";
            case 37: return "left";
            case 38: return "up";
            case 39: return "right";
            case 40: return "down";
            case 45: return "insert";
            case 46: return "delete";
            default:     
                return String.fromCharCode(code).toLowerCase();
        }
    }
    
    static send(name:string, e:any) {
        var status = false;
        switch(name) {
            case "keydown":
                status = true;
            case "keyup":
                var key = Input.convertCode(e.which);
                e.key = key;
                Input.keys[key] = status;
                break;
            case "mousedown":
                status = true;
            case "mouseup":
                Input.mouse.down = status;
                break;
            case "mousemove":
                Input.mouse.x = e.clientX;
                Input.mouse.y = e.clientY;
                break;
        }
        
        Input.instances.forEach((component:Input) => {
            component.send(name, e);
        });
    }  
}

[ "keydown", "keypress", "keyup", "click", 
  "contextmenu", "mousedown", "mouseup", "mousemove" ].forEach((event) => {
   document.addEventListener(event, Input.send.bind(null, event)); 
});

export = Input;
