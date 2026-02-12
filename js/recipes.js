export const recipes = [
    {
        name: "Espresso",
        ingredients: ["coffee"]
    },
    {
        name: "Latte",
        ingredients: ["coffee", "milk"]
    },
    {
        name: "Cappuccino",
        ingredients: ["coffee", "milk", "foam"]
    },
    {
        name: "Americano",
        ingredients: ["coffee", "water"]
    }
];

export function getRandomRecipe() {
    return recipes[Math.floor(Math.random() * recipes.length)];
}

