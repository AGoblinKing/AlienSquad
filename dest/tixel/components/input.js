var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "tixel/components/../entity"], function(require, exports, Entity) {
    var Mouse = (function () {
        function Mouse() {
        }
        return Mouse;
    })();

    var Input = (function (_super) {
        __extends(Input, _super);
        function Input() {
            _super.apply(this, arguments);
        }
        // perhaps this should be generic?
        Input.prototype.created = function () {
            Input.instances.push(this);
        };

        Input.prototype.destroyed = function () {
            Input.instances.splice(Input.instances.indexOf(this), 1);
        };

        Input.convertCode = function (code) {
            switch (code) {
                case 8:
                    return "backspace";
                case 9:
                    return "tab";
                case 13:
                    return "enter";
                case 16:
                    return "shift";
                case 17:
                    return "ctrl";
                case 18:
                    return "alt";
                case 19:
                    return "pause";
                case 20:
                    return "capslock";
                case 27:
                    return "escape";
                case 33:
                    return "pageup";
                case 34:
                    return "pagedown";
                case 35:
                    return "end";
                case 36:
                    return "home";
                case 37:
                    return "left";
                case 38:
                    return "up";
                case 39:
                    return "right";
                case 40:
                    return "down";
                case 45:
                    return "insert";
                case 46:
                    return "delete";
                default:
                    return String.fromCharCode(code).toLowerCase();
            }
        };

        Input.send = function (name, e) {
            var status = false;
            switch (name) {
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

            Input.instances.forEach(function (component) {
                component.send(name, e);
            });
        };
        Input.mouse = new Mouse();
        Input.keys = {};
        Input.instances = [];
        return Input;
    })(Entity.Component);

    [
        "keydown", "keypress", "keyup", "click",
        "contextmenu", "mousedown", "mouseup", "mousemove"].forEach(function (event) {
        document.addEventListener(event, Input.send.bind(null, event));
    });

    
    return Input;
});
