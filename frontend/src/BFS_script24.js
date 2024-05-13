class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth) {
    console.log("BFS function called");
    console.log("Starting Components:", startingComponents);
    console.log("Target Components:", targetComponents);
    console.log("Max Depth:", maxDepth);
    console.log("Max Candies:", maxCandies);
    console.log("yourRecipes:", yourRecipes);
    console.log("simpleExchange:", simpleExchange);
    
    let queue = new Queue();
    queue.enqueue([startingComponents, [], 0]); // Add depth information to the queue
    let visited = new Set();
    let allPaths = [];

    const hasAllComponents = (components, target) =>
        target.every(component => components.filter(x => x === component).length >= target.filter(x => x === component).length);

    if (hasAllComponents(startingComponents, targetComponents)) {
        return [true, []];
    }

    while (!queue.isEmpty()) {
        let [currentState, path, depth] = queue.dequeue();

        if (hasAllComponents(currentState, targetComponents)) {
            allPaths.push([path, currentState]);
        }

        if (depth < maxDepth) {
            Object.entries(yourRecipes).forEach(([recipeKey, result]) => {
                let recipe = recipeKey.split(', ');
                if (recipe.every(component => currentState.filter(x => x === component).length >= recipe.filter(x => x === component).length)) {
                    let newState = [...currentState];
                    recipe.forEach(component => {
                        newState.splice(newState.indexOf(component), 1);
                    });
                    newState.push(...result);

                    if (!visited.has(newState.toString()) && newState.length <= maxCandies) {
                        visited.add(newState.toString());
                        queue.enqueue([newState, [...path, [recipe, result]], depth + 1]); // Increment depth
                    }
                }
            });

            Object.entries(simpleExchange).forEach(([recipeKey, resultLists]) => {
                let recipe = recipeKey.split(', ');
                resultLists.forEach(singleVal => {
                    if (recipe.every(component => currentState.filter(x => x === component).length >= recipe.filter(x => x === component).length)) {
                        let newState = [...currentState];
                        recipe.forEach(component => {
                            newState.splice(newState.indexOf(component), 1);
                        });
                        newState.push(...singleVal.split(', '));

                        if (!visited.has(newState.toString()) && newState.length <= maxCandies) {
                            visited.add(newState.toString());
                            queue.enqueue([newState, [...path, [recipe, singleVal.split(', ')]], depth + 1]); // Increment depth
                        }
                    }
                });
            });
        }
    }



    if( allPaths.length === 0)
        return [false, allPaths]
    else{
        let [pathWithMostCandies, maxRemainingCandies] = findPathWithMostCandies(allPaths);
        return [true, allPaths, pathWithMostCandies]
    }


        
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

// let startingComponents = [
//     'P', 'P', 'P', 'P', 'P', 'P', 'P',
//     'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
//     'L', 'L', 'L', 'L',
//     'R', 'R', 'R', 'R', 'R',
// ];

// let yourRecipes = {
//     "G, G, L": ["B", "P", "P"],
//     "P, G": ["B", "B", "B"],
//     "L, L, R": ["B", "P", "P"],
//     "B, P, P": ["G", "G", "R"],
// };

// let simpleExchange = {
//     "B, B, B": ["P", "G", "L", "R"],
//     "P, P, P": ["B", "G", "L", "R"],
//     "G, G, G": ["B", "P", "L", "R"],
//     "L, L, L": ["B", "P", "G", "R"],
//     "R, R, R": ["B", "P", "G", "L"],
// };

// let targetComponents = [
//     'B', 'B', 'B', 'B', 'B',
//     'P',
//     'G', 'G', 'G', 'G',
//     'L', 'L', 'L', 'L',
//     'R', 'R',
// ];

// let maxCandies = 24;
// // let maxDepth = 5;


// let startingComponents = [
//     "B", "P", "Y", "R",
// ]

// let targetComponents = [
//     "B", "P", "Y", "O",
// ]
// let yourRecipes = {
//     "R": ["O"]
// }

// let simpleExchange = {
//     "B, B, B": ["P", "Y", "O", "R"],
//     "P, P, P": ["B", "Y", "O", "R"],
//     "Y, Y, Y": ["B", "P", "O", "R"],
//     "O, O, O": ["B", "P", "Y", "R"],
//     "R, R, R": ["B", "P", "Y", "O"],
// };

// let maxCandies = 20
// let maxDepth = 5

// let [found, allPaths, maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);
// console.log("SOLUTION", found, maxPath)
export default bfs;
