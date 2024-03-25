function generateCandyRecipes() {
    const candies = ['Candy1', 'Candy2', 'Candy3', 'Candy4', 'Candy5'];
    let recipes = {};
    let recipeCount = 0;

    // Function to add a recipe
    function addRecipe(input, output) {
        recipes[++recipeCount] = { inputs: [input, input, input], outputs: output };
    }

    for (let i = 0; i < candies.length; i++) {
        let inputCandy = candies[i];
        for (let j = 0; j < candies.length; j++) {
            if (i !== j) {
                addRecipe(inputCandy, candies[j]);
                if (recipeCount === 20) break;
            }
        }
        if (recipeCount === 20) break;
    }

    return recipes;
}

export default generateCandyRecipes

