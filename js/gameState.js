export const GameState = {
    WAITING_FOR_COIN: "WAITING_FOR_COIN",
    ORDER_GENERATED: "ORDER_GENERATED",
    MAKING_COFFEE: "MAKING_COFFEE",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL"
};

export let currentState = GameState.WAITING_FOR_COIN;
export let currentOrder = null;
export let playerIngredients = [];

export function setState(newState) {
    currentState = newState;
}

export function setOrder(order) {
    currentOrder = order;
}

export function resetGame() {
    playerIngredients.length = 0;
    currentOrder = null;
    currentState = GameState.WAITING_FOR_COIN;
}
