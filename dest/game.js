var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "tixel", "bomber/scene"], function(require, exports, Txl, BomberScene) {
    var AlienSquad = (function (_super) {
        __extends(AlienSquad, _super);
        function AlienSquad() {
            _super.call(this);
            this.scene = new BomberScene();
            this.start();

            /*
            setTimeout(() => {
            this.scene = new BomberScene();
            }, 7000);*/
            this.camera.position.y = 14;
            this.camera.rotation.x = -90 * Math.PI / 180;
        }
        return AlienSquad;
    })(Txl.Game);

    var game = new AlienSquad();
});
