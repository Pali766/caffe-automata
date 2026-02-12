import { setState, GameState } from "./gameState.js";
import { getRandomRecipe } from "./recipes.js";
import { currentOrder } from "./gameState.js";

export function checkCoinInsert(coin, machine, uiElement) {
    if (coin.position.distanceTo(machine.position) < 1) {

        setState(GameState.ORDER_GENERATED);

        const order = getRandomRecipe();
        window.currentOrder = order;

        uiElement.innerText = "Rendelés: " + order.name;

        setTimeout(() => {
            setState(GameState.MAKING_COFFEE);
        }, 1000);
    }
}

