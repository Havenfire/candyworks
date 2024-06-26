class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        return this.isEmpty() ? "Underflow" : this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function componentSufficient(currentState, recipe) {
    return recipe.every(component => 
        currentState.filter(x => x === component).length >= 
        recipe.filter(x => x === component).length
    );
}

function applyRecipe(currentState, recipe, result) {
    let newState = [...currentState];
    recipe.forEach(component => {
        newState.splice(newState.indexOf(component), 1);
    });
    newState.push(...result);
    return newState;
}

function bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth) {
    let queue = new Queue();
    queue.enqueue([startingComponents, [], 0]); // Add depth information to the queue
    let visited = new Set();
    let allPaths = [];

    if (componentSufficient(startingComponents, targetComponents)) {
        return [true, []];
    }

    while (!queue.isEmpty()) {
        let [currentState, path, depth] = queue.dequeue();
        if (componentSufficient(currentState, targetComponents)) {
            allPaths.push([path, currentState]);
        }
        if (depth >= maxDepth) continue;
        processRecipes(yourRecipes, currentState, path, depth, visited, queue, maxCandies);
        processRecipes(simpleExchange, currentState, path, depth, visited, queue, maxCandies, true);
    }

    return allPaths.length === 0 ? [false, allPaths] : [true, allPaths, findPathWithMostCandies(allPaths)];
}

function processRecipes(recipes, currentState, path, depth, visited, queue, maxCandies, isSimpleExchange = false) {
    Object.entries(recipes).forEach(([recipeKey, resultLists]) => {
        let recipe = recipeKey.split(', ');
        if (!componentSufficient(currentState, recipe)) return;
        (isSimpleExchange ? resultLists : [resultLists]).forEach(result => {
            let newState = applyRecipe(currentState, recipe, isSimpleExchange ? result.split(', ') : result);
            if (!visited.has(newState.toString()) && newState.length <= maxCandies) {
                visited.add(newState.toString());
                queue.enqueue([newState, [...path, [recipe, result]], depth + 1]);
            }
        });
    });
}

function findPathWithMostCandies(allPaths) {
    let maxRemainingCandies = -1;
    let pathWithMostCandies = null;
    allPaths.forEach(([path, state]) => {
        let remainingCandies = state.length;
        if (remainingCandies > maxRemainingCandies) {
            maxRemainingCandies = remainingCandies;
            pathWithMostCandies = path;
        }
    });
    return [pathWithMostCandies, maxRemainingCandies];
}

// let maxCandies = 20;
// let maxDepth = 5;

// let startingComponents = [
//     "B", "B", 'B', 
//     "P", "P", 
//     "Y", "Y", "Y", "Y", 
//     "O", "O", "O", "O",
//     "R", "R", 'R', "R", "R", "R", "R",
// ];

// let yourRecipes = {
//     "B, P, P": ["Y", "O", "O", "R"],
//     "P, O": ["B", "B", "B", "B"],
//     "P, R, R": ["Y", "Y", "Y", "Y"],
// };

// let targetComponents = [
//     "B", "B", "B", "B", "B", "B", 
//     "P", "P", 
//     "Y", "Y", 
//     "O", "O", "O", "O",
// ];

// let simpleExchange = {
//     "B, B, B": ["P", "Y", "O", "R"],
//     "P, P, P": ["B", "Y", "O", "R"],
//     "Y, Y, Y": ["B", "P", "O", "R"],
//     "O, O, O": ["B", "P", "Y", "R"],
//     "R, R, R": ["B", "P", "Y", "O"],
// };

// let startingComponents = [
//     "B", "B", "B",
//     "P", "P", "P",
//     "Y", "Y", "Y", "Y", "Y", 
//     "O", "O",
//     "R", "R", "R", "R", "R", "R", "R",
// ];

// let yourRecipes = {
//     "B, P, P": ["Y", "O", "O", "R"],
//     "P, O": ["B", "B", "B", "B"],
//     "P, R, R": ["Y", "Y", "Y", "Y"],
// };

// let targetComponents = [
//     "B", "B", "B", "B", "B",
//     "P",
//     "Y", "Y", "Y", 
//     "O", "O", "O",
// ];

// let simpleExchange = {
//     "B, B, B": ["P", "Y", "O", "R"],
//     "P, P, P": ["B", "Y", "O", "R"],
//     "Y, Y, Y": ["B", "P", "O", "R"],
//     "O, O, O": ["B", "P", "Y", "R"],
//     "R, R, R": ["B", "P", "Y", "O"],
// };  


// let [found, allPaths, maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);
// console.log("SOLUTION", found, maxPath)
// console.log(maxPath[0])

export default bfs;
