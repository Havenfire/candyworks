
#candy list
# 1 Cyan Helio Gumdrops
# 2 Pink Stonehall Sweeties
# 3 Gren Jidi-Pops
# 4 Purp Redmaw Twists
# 5 Redd Silkmire Sugar Strings
# X Anyy Candy

candy_types = (1,2,3,4,5)
recipe_list = {}
current_candy = "11222222233334444"
target_candy =  "1111122223333444"
pathway = ""

def add_recipe(input, output): 
    print(input + " " + output)
    return input + " " + output

def add_custom_recipe():
    for i in range(1,5):
        recipe_list.update({str(i) + str(i) + str(i) : "X"})

#if the recipe works, return the new string
def check_recipe(test_str, input, output):
    x = test_str
    for index, char in enumerate(input):
        if char in x:
            x = x.replace(char, "",1)
        else:
            return 0
    x = x + output
    return "".join(sorted(x))

def contains(test_current):
    for index, char in enumerate(test_current):
        if char in target_candy:
            test_current = test_current.replace(char, "",1)
        else:
            return False
    return True

# args[0] = visited list of parent
# args[1] = this candy string
def recurse(*args):
    pathway = args[0]
    this_candy_iteration = str(args[1])


    if(this_candy_iteration == target_candy):
        return pathway

    if len(args[0]) > 5:
        return "5 recipes deep"

    for key, value in recipe_list.items():
        recipe = key
        new_candy_iteration = str(check_recipe(str(this_candy_iteration), key, value))
        #check if recipe works, if it doesn't, move on
        if new_candy_iteration == "0":
            continue

        #only continues loop if recipe worked
        pathway.append(recipe)
        return recurse(pathway, str(new_candy_iteration))

    return pathway

def main():
#    add_custom_recipe()
    recipe_list.update({"233" : "1115"})
    recipe_list.update({"1223" : "4444"})
    recipe_list.update({"225": "334"})
    recipe_list.update({"155" :"2224"})
    
    visitedarr = []
    path = recurse(visitedarr, current_candy)
    print(path)    
    return 1



if __name__ == '__main__':
    main()
