from collections import deque
import sys
from typing import List


def bfs(starting_components, your_recipes, simple_exchange, target_components, max_candies, max_depth):
    queue = deque([(starting_components, [], 0)])  # Add depth information to the queue
    visited = set()
    all_paths = []

    if all(starting_components.count(component) >= target_components.count(component) for component in set(target_components)):
        return True, []

    while queue:
        current_state, path, depth = queue.popleft()

        if all(current_state.count(component) >= target_components.count(component) for component in set(target_components)):
            all_paths.append((path, current_state))

        if depth < max_depth:
            for recipe, result in your_recipes.items():

                if all(current_state.count(component) >= recipe.count(component) for component in recipe):
                    new_state = list(current_state)
                    for component in recipe:
                        new_state.remove(component)
                    new_state.extend(result)

                    if tuple(new_state) not in visited and len(new_state) <= max_candies:
                        visited.add(tuple(new_state))
                        queue.append((new_state, path + [(recipe, result)], depth + 1))  # Increment depth
            
            for recipe, result_list in simple_exchange.items():
                for single_val in result_list:
                    if all(current_state.count(component) >= recipe.count(component) for component in recipe):
                        new_state = list(current_state)
                        for component in recipe:
                            new_state.remove(component)
                        new_state.extend(single_val)

                        if tuple(new_state) not in visited and len(new_state) <= max_candies:
                            visited.add(tuple(new_state))
                            queue.append((new_state, path + [(recipe, single_val)], depth + 1))  # Increment depth                
                

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

# starting_components = [
#     'A', 'A',
#     'B', 'B', 'B', 'B', 'B', 'B', 'B',
#     'E', 'E'
# ]

# your_recipes = {
#     ('B', 'B', 'E'): ('C', 'C', 'D'),
#     ('A', 'E', 'E'): ('B', 'B', 'B', 'D'),
#     ('B', 'B'): ('C'),
#     ('B', 'B', 'B'): ('C', 'C'),
#     ('E',): ('A', 'A'),
#     ('A', 'A'): ('D', 'D', 'C'),
    
# }

# target_components = ['A', 'B', 'B', 'C', 'C']

starting_components = [
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 
    'G','G','G','G','G','G','G','G',
    'L','L','L','L',
    'R','R','R','R','R',
]

your_recipes = {
    ('G', 'G', 'L'): ('B', 'P', 'P'),
    ('P', 'G'): ('B', 'B', 'B'),
    ('L', 'L', 'R'): ('B', 'P', 'P'),
    ('B', 'P', 'P'): ('G', 'G', 'R'),
}

target_components = [    
    'B', 'B', 'B', 'B', 'B',
    'P', 
    'G','G','G','G',
    'L','L','L','L',
    'R', 'R'
]

simple_exchange = {
    ('B', 'B', 'B'): ['P', 'G', 'L', 'R'],
    ('P', 'P', 'P'): ['B', 'G', 'L', 'R'],
    ('G', 'G', 'G'): ['B', 'P', 'L', 'R'],
    ('L', 'L', 'L'): ['B', 'P', 'G', 'R'],
    ('R', 'R', 'R'): ['B', 'P', 'G', 'L'],

}

def run_candyworks(starting_components: List[str], target_components: List[str], your_recipes, max_candies = 24, max_depth = 6):
    print ("Running Candyworks")

    result_path = bfs(starting_components, your_recipes, simple_exchange, target_components, max_candies, max_depth)
    if result_path[0]:
        if result_path[1] == []:
            print("Starting components contain the target")
        else:
            print("BFS Paths Found:")
            for path, state in result_path[1]:
                print("Path:")
                for recipe in path:
                    print(f"Apply Recipe {recipe[0]} to get to {recipe[1]}")
                print_remaining_candies(state) 
                print("-------------------")

            path_with_most_candies, most_candies = find_path_with_most_candies(result_path[1])  
            print("\nPath with Most Candies Remaining:")
            print(path_with_most_candies)
            print("Number of Candies Remaining Before Starting Exchange:", len(starting_components))
            print("Number of Candies Remaining After Purchase:", most_candies - len(target_components))
    else:
        print("No path found.")
        return 

    return path_with_most_candies, len(starting_components), most_candies - len(target_components)

run_candyworks(starting_components, target_components, your_recipes, 24, 5)