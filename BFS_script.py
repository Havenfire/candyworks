def can_reach_target(starting_components, target_ending_components, recipes):
  # Create a set of available components, initially just the starting components
  available_components = set(starting_components)
  
  # Keep track of the components that have been checked
  checked_components = set()

  # Create a queue to hold the components that need to be checked
  queue = []
  for component in available_components:
    queue.append(component)

  # Create a list to hold the applied recipes
  applied_recipes = []

  # Continue searching until there are no more components to check
  while queue:
    current_component = queue.pop(0)

    # Skip this component if it has already been checked
    if current_component in checked_components:
      continue

    # Mark the component as checked
    checked_components.add(current_component)

    # Check if the current component is in the list of target ending components
    if current_component in target_ending_components:
      return applied_recipes

    # Check if any of the recipes can be applied to the current component
    for recipe in recipes:
      input_components, output_components = recipe
      # Check if all of the input components are available
      if all(comp in available_components for comp in input_components):
        # Add the output components to the set of available components
        available_components.update(output_components)
        # Add the output components to the queue to be checked
        for component in output_components:
          queue.append(component)
        # Add the recipe to the list of applied recipes
        applied_recipes.append(recipe)

  # If we reach here, it means that none of the target ending components were reached
  return []




starting_components = [    
  'A', 'A',     
  'B', 'B', 'B', 'B', 'B', 'B', 'B',     
  'C', 'C', 'C', 'C',     
  'D', 'D', 'D', 'D']
target_ending_components = [    
  'A', 'A', 'A', 'A', 'A',     
  'B', 'B', 'B', 'B',     
  'C', 'C', 'C', 'C',     
  'D', 'D', 'D']
  
recipes = [  
  (['B', 'B','C'], ['A','A','A','E']),
  (['A','B','B','C'], ['D','D','D','D']),
  (['B','B','E'], ['C','C','D']),
  (['A','E','E'], ['B','B','B','D']),
]

result = can_reach_target(starting_components, target_ending_components, recipes)
print(result) 

