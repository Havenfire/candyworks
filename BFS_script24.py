from collections import deque

def bfs(starting_components, recipes, target_components):
    queue = deque([(starting_components, [])])
    visited = set()
    all_paths = []

    if all(starting_components.count(component) >= target_components.count(component) for component in set(target_components)):
        return True, []

    while queue:
        current_state, path = queue.popleft()

        if all(current_state.count(component) >= target_components.count(component) for component in set(target_components)):
            all_paths.append((path, current_state))

        for recipe, result in recipes.items():
            if all(current_state.count(component) >= recipe.count(component) for component in recipe):
                new_state = list(current_state)
                for component in recipe:
                    new_state.remove(component)
                new_state.extend(result)

                if tuple(new_state) not in visited:
                    visited.add(tuple(new_state))
                    queue.append((new_state, path + [(recipe, result)]))

    if all_paths:
        return True, all_paths
    else:
        return False, None

def print_remaining_candies(components):
    print("Remaining candies:")
    for component in set(components):
        count = components.count(component)
        print(f"{component}: {count}")

def find_path_with_most_candies(all_paths):
    max_remaining_candies = -1
    path_with_most_candies = None

    for path, state in all_paths:
        remaining_candies = sum(state.count(component) for component in set(state))
        if remaining_candies > max_remaining_candies:
            max_remaining_candies = remaining_candies
            path_with_most_candies = path

    return path_with_most_candies, max_remaining_candies

starting_components = [
    'A', 'A',
    'B', 'B', 'B', 'B', 'B', 'B', 'B',
    'E', 'E'
]

recipes = {
    ('B', 'B', 'E'): ('C', 'C', 'D'),
    ('A', 'E', 'E'): ('B', 'B', 'B', 'D'),
    ('B', 'B'): ('C'),
    ('B', 'B', 'B'): ('C', 'C'),
    ('E',): ('C'),  # Fixed the recipe tuple
}

target_components = ['A', 'B', 'B', 'C', 'C']

result_path = bfs(starting_components, recipes, target_components)

if result_path[0]:
    if result_path[1] == []:
        print("Starting components contain the target")
    else:
        print("BFS Paths Found:")
        for path, state in result_path[1]:
            print("Path:")
            for recipe in path:
                print(f"Apply Recipe {recipe[0]} to get to {recipe[1]}")
            print_remaining_candies(state)  # Print remaining candies after each path
            print("-------------------")

        path_with_most_candies, most_candies = find_path_with_most_candies(result_path[1])
        print("\nPath with Most Candies Remaining:")
        print(path_with_most_candies)
        print("Number of Candies Remaining Before Purchase:", most_candies)
        print("Number of Candies Remaining After Purchase:", most_candies - len(target_components))
else:
    print("No path found.")
