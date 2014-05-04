define(["require", "exports", "utils"], function(require, exports, Utils) {
    // Should people ever extend this? no :/
    var Game = (function () {
        function Game() {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
            Utils.WindowResize(this.renderer, this.camera);
            document.body.appendChild(this.renderer.domElement);
        }
        // just a nice wrapper
        Game.prototype.start = function () {
            this.lastTime = (new Date()).getTime();
            this.update();
            this.render();
        };

        // update ASAP
        Game.prototype.update = function () {
            var _this = this;
            //this.setImmediate :(
            var currentTime = (new Date()).getTime();
            this.scene.update(currentTime - this.lastTime);
            this.lastTime = currentTime;
            setTimeout(function () {
                return _this.update();
            }, 0);
        };

        Game.prototype.render = function () {
            var _this = this;
            requestAnimationFrame(function () {
                return _this.render();
            });
            this.renderer.render(this.scene, this.camera);
        };
        return Game;
    })();

    
    return Game;
});
