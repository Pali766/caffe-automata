import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

let scene, camera, renderer;
let coin, machine;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedObject = null;

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f4);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7);
    scene.add(light);

    createMachine();
    createCoin();

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", () => selectedObject = null);
}

function createMachine() {
    const geometry = new THREE.BoxGeometry(2, 3, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
    machine = new THREE.Mesh(geometry, material);
    machine.position.x = 1.5;
    scene.add(machine);
}

function createCoin() {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    coin = new THREE.Mesh(geometry, material);
    coin.rotation.x = Math.PI / 2;
    coin.position.x = -2;
    scene.add(coin);
}

function onMouseDown(event) {
    updateMouse(event);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([coin]);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
    }
}

function onMouseMove(event) {
    if (!selectedObject) return;

    updateMouse(event);
    raycaster.setFromCamera(mouse, camera);
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, point);

    selectedObject.position.x = point.x;
    selectedObject.position.y = point.y;

    checkCoinInsert();
}

function updateMouse(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function checkCoinInsert() {
    if (coin.position.distanceTo(machine.position) < 1) {
        document.getElementById("orderText").innerText =
            "Válassz kávét! (Espresso / Latte / Cappuccino)";
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

