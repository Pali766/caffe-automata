import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { playerIngredients, currentState, GameState } from "./gameState.js";

export let ingredientButtons = [];

export function createIngredientButtons(scene) {

    const ingredients = [
        { name: "coffee", color: 0x4b2e2e, x: 1.5 },
        { name: "milk", color: 0xffffff, x: 2.2 },
        { name: "foam", color: 0xdddddd, x: 2.9 },
        { name: "water", color: 0x3399ff, x: 3.6 }
    ];

    ingredients.forEach(item => {
        const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const material = new THREE.MeshStandardMaterial({ color: item.color });
        const button = new THREE.Mesh(geometry, material);

        button.position.set(item.x, -1, 0);
        button.userData.type = item.name;

        scene.add(button);
        ingredientButtons.push(button);
    });
}

export function handleIngredientClick(object) {
    if (currentState !== GameState.MAKING_COFFEE) return;

    playerIngredients.push(object.userData.type);
    console.log("Hozzáadva:", object.userData.type);
}

