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


test('Simple bfs operations', () => {
    const startingComponents = ["A", "B"];
    const yourRecipes = {
        "A, B": ["C", "D"],
    };
    let simpleExchange = {
        "A, A, A": ["B", "C", "D", "E"],
        "B, B, B": ["A", "C", "D", "E"],
        "C, C, C": ["A", "B", "D", "E"],
        "D, D, D": ["A", "B", "C", "E"],
        "E, E, E": ["A", "B", "C", "D"],
    };
    const targetComponents = ["C", "D"];
    const maxCandies = 10;
    const maxDepth = 3;
    const [found, allPaths, maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);
    expect(found).toBe(true);
    expect(allPaths.length).toBeGreaterThan(0);
    expect(maxPath).toStrictEqual([
        [['A', 'B'], ['C', 'D']],
    ]);
});

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

    let [found, , maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);

    expect(found).toBe(true)
    expect(maxPath).toStrictEqual([
        [['R', 'R', 'R'], ['P']],
        [['P', 'O'], ['B', 'B', 'B', 'B']],
        [['R', 'R', 'R'], ['O']]
    ])

})



