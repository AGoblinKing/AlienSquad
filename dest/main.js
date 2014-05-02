define(["require", "exports", "utils", "maps/title"], function(require, exports, Utils, Title) {
    var renderer = new THREE.WebGLRenderer({ antialias: true }), camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000), scene = new THREE.Scene();

    // Scene
    var titleMap = new Title();

    scene.add(camera);
    scene.add(titleMap);

    camera.position.y = 50;
    camera.rotation.x = -90 * Math.PI / 180;

    // Render
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        titleMap.update(0);
    }

    Utils.WindowResize(renderer, camera);
    document.body.appendChild(renderer.domElement);
    render();
});
