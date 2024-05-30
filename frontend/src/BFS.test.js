// import Queue, { componentSufficient, applyRecipe, bfs } from './bfs.js';
const {Queue} = require('./BFS');

describe('Queue class', () => {
    test('enqueue and dequeue operations', () => {  
        let queue = new Queue();
        expect(queue.isEmpty()).toBe(true);
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe("Underflow");
        expect(queue.isEmpty()).toBe(true);
    });
});






//         const insufficientRecipe = ["A", "A", "A"];
//         expect(componentSufficient(currentState, recipe)).toBe(true);
//         expect(componentSufficient(currentState, insufficientRecipe)).toBe(false);
//     });
// });


// describe('applyRecipe function', () => {
//     test('applies recipe to the current state', () => {
//         const currentState = ["A", "A", "B", "C"];
//         const recipe = ["A", "B"];
//         const result = ["D", "E"];
//         const newState = applyRecipe(currentState, recipe, result);
//         expect(newState).toEqual(["A", "C", "D", "E"]);
//     });
// });

// describe('BFS functionality', () => {
//     test('returns correct path for simple scenario', () => {
//         const startingComponents = ["A", "B"];
//         const yourRecipes = {
//             "A, B": ["C", "D"],
//         };
//         const simpleExchange = {
//             "A, B": ["E"],
//         };
//         const targetComponents = ["C", "D"];
//         const maxCandies = 10;
//         const maxDepth = 2;
//         const [found, allPaths, maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);
//         expect(found).toBe(true);
//         expect(allPaths.length).toBeGreaterThan(0);
//         expect(maxPath).toContainEqual(["A, B", ["C", "D"]]);
//     });
// });
