export class Queue {
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

function checkYourRecipe(yourRecipes, currentState, visited, maxCandies, queue, path, depth){
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

}

function checkSimpleExchange(simpleExchange, currentState, visited, maxCandies, queue, path, depth){
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

function hasAllComponents(components, target) {
    return target.every(component => 
        components.filter(x => x === component).length >= target.filter(x => x === component).length
    );
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

export default function bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth) {
    
    let queue = new Queue();
    queue.enqueue([startingComponents, [], 0]); // state components, path to state components, depth
    let visited = new Set();
    let allPaths = [];

    if (hasAllComponents(startingComponents, targetComponents)) {
        return [true, []];
    }

    while (!queue.isEmpty()) {
        let [currentState, path, depth] = queue.dequeue();

        if (hasAllComponents(currentState, targetComponents)) {
            allPaths.push([path, currentState]);
        }

        if (depth < maxDepth) {
            checkYourRecipe(yourRecipes, currentState, visited, maxCandies, queue, path, depth)
            checkSimpleExchange(simpleExchange, currentState, visited, maxCandies, queue, path, depth)
        }
    }



    if( allPaths.length === 0)
        return [false, allPaths]
    else{
        let [pathWithMostCandies] = findPathWithMostCandies(allPaths);
        return [true, allPaths, pathWithMostCandies]
    }


        
}



