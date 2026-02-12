import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { GameState, currentState, setState, playerIngredients, resetPlayerIngredients } from "./gameState.js";
import { createIngredientButtons, ingredientButtons, handleIngredientClick } from "./machine.js";
import { checkCoinInsert } from "./drag.js";

const coffeeRecipes = ["Espresso", "Latte", "Cappuccino", "Americano"];
let coffeeSelected = false;

function showCoffeeSelection() {
    const overlay = document.createElement("div");
    overlay.style = `
        position:absolute; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.7); display:flex; flex-direction:column;
        justify-content:center; align-items:center; z-index:1000;
    `;
    const title = document.createElement("div");
    title.innerText = "Válassz kávét!";
    title.style.color = "white"; title.style.fontSize="24px"; title.style.marginBottom="20px";
    overlay.appendChild(title);

    coffeeRecipes.forEach(name => {
        const btn = document.createElement("button");
        btn.innerText = name;
        btn.style.margin="5px"; btn.style.padding="10px 20px"; btn.style.fontSize="18px";
        btn.addEventListener("click", ()=>{
            uiText.innerText = name + " készül! ☕";
            coffeeSelected = true;
            document.body.removeChild(overlay);
        });
        overlay.appendChild(btn);
    });

    document.body.appendChild(overlay);
}

let scene, camera, renderer;
let coin, machine;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedObject = null;

const uiText = document.getElementById("orderText");

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f4);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7);
    scene.add(light);

    createMachine();
    createCoin();
    createIngredientButtons(scene);

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

    const intersects = raycaster.intersectObjects([coin, ...ingredientButtons]);

    if (intersects.length > 0) {
        const obj = intersects[0].object;

        if (obj === coin) {
            selectedObject = coin;
        } else {
            handleIngredientClick(obj);
            checkRecipe();
        }
    }
}

function onMouseMove(event) {
    if (!selectedObject) return;

    updateMouse(event);
    raycaster.setFromCamera(mouse, camera);

    // DINAMIKUS sík az érme z pozícióján
    const plane = new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        -selectedObject.position.z
    );

    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, point);

    selectedObject.position.copy(point);

    checkCoinInsert(coin, machine, uiText);
}


function updateMouse(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

import { currentOrder, playerIngredients, resetGame } from "./gameState.js";

function checkRecipe() {

    if (!currentOrder) return;

    const required = currentOrder.ingredients;

    if (playerIngredients.length === required.length) {

        const correct = required.every((ing, i) => ing === playerIngredients[i]);

        if (correct) {
            uiText.innerText = "Kész! ☕";
        } else {
            uiText.innerText = "Hibás recept! ❌";
        }

        setTimeout(() => {
            resetGame();
            uiText.innerText = "Dobd be az érmét!";
        }, 2000);
    }
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
