import { setState, setOrder, GameState } from "./gameState.js";
import { getRandomRecipe } from "./recipes.js";

export function checkCoinInsert(coin, machine, uiElement) {

    if (coin.position.distanceTo(machine.position) < 1 &&
        coin.userData.inserted !== true) {

        coin.userData.inserted = true;

        const order = getRandomRecipe();
        setOrder(order);
        setState(GameState.MAKING_COFFEE);

        uiElement.innerText = "Rendelés: " + order.name;
    if(coin.position.distanceTo(machine.position) < 1){
    if(!coffeeSelected){
        uiText.innerText = "Érme bent! ☕";
        showCoffeeSelection();
        coffeeSelected = true;
    }
}
