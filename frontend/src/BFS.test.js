import bfs, { Queue } from './bfs.js';
import { expect, test } from 'vitest'

test('enqueue and dequeue operations', () => {
    let queue = new Queue();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.items).toEqual([1]);
    queue.enqueue(2);
    expect(queue.items).toEqual([1, 2]);
    queue.dequeue();
    queue.dequeue();
    expect(queue.dequeue()).toBe("Underflow");
})


test('Complex bfs operations', () => {

    let startingComponents = [
        "B", "B", 'B',
        "P", "P",
        "Y", "Y", "Y", "Y",
        "O", "O", "O", "O",
        "R", "R", 'R', "R", "R", "R", "R",
    ];

    let yourRecipes = {
        "B, P, P": ["Y", "O", "O", "R"],
        "P, O": ["B", "B", "B", "B"],
        "P, R, R": ["Y", "Y", "Y", "Y"],
    };

    let targetComponents = [
        "B", "B", "B", "B", "B", "B",
        "P", "P",
        "Y", "Y",
        "O", "O", "O", "O",
    ];

    let maxCandies = 20;
    let maxDepth = 5;


    let simpleExchange = {
        "B, B, B": ["P", "Y", "O", "R"],
        "P, P, P": ["B", "Y", "O", "R"],
        "Y, Y, Y": ["B", "P", "O", "R"],
        "O, O, O": ["B", "P", "Y", "R"],
        "R, R, R": ["B", "P", "Y", "O"],
    };

    let [found, allPaths, maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);

    expect(maxPath).toStrictEqual([
        [['R', 'R', 'R'], ['P']],
        [['P', 'O'], ['B', 'B', 'B', 'B']],
        [['R', 'R', 'R'], ['O']]
    ])



})



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
