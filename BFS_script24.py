from collections import deque

def bfs(starting_components, recipes, target_components):
    queue = deque([(starting_components, [])])
    visited = set()

    if all(starting_components.count(component) >= target_components.count(component) for component in set(target_components)):
        return True, []

    while queue:
        current_state, path = queue.popleft()

        if all(current_state.count(component) >= target_components.count(component) for component in set(target_components)):
            return True, path

        for recipe, result in recipes.items():
            if all(current_state.count(component) >= recipe.count(component) for component in recipe):
                new_state = list(current_state)
                for component in recipe:
                    new_state.remove(component)
                new_state.extend(result)

                if tuple(new_state) not in visited:
                    visited.add(tuple(new_state))
                    queue.append((new_state, path + [(recipe, result)]))

    return False, None

starting_components = [
    'A', 'A',
    'B', 'B', 'B', 'B', 'B', 'B', 'B',
]

recipes = {
    ('B', 'B', 'C'): ('A', 'A', 'A', 'E'),
    ('A', 'B', 'B', 'C'): ('D', 'D', 'D', 'D'),
    ('B', 'B', 'E'): ('C', 'C', 'D'),
    ('A', 'E', 'E'): ('B', 'B', 'B', 'D'),
    ('B', 'B'): ('C')
}

target_components = ['A', 'B', 'B', 'C', 'C']

result_path = bfs(starting_components, recipes, target_components)

if result_path[0]:
    if result_path[1] == []:
        print("Starting components contain target")
    else:
        print("BFS Path Found:")
        print(result_path)
        for recipe in result_path[1]:
            print(f"Apply Recipe {recipe} to get to target")
else:
    print("No path found.")
