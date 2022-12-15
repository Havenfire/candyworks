
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
        recipe_list.update({str(i) + "X" : (str(i) + str(i) + str(i),"X")})

# args[0] = visited list of parent
# args[1] = recipe key
# args[2] = current candy string
def mainloop(*args):
    this_candy_iteration = str(args[2])
    if(this_candy_iteration == target_candy):
        return pathway

    visited = []
    if len(args[0]) > 5:
        return -1
    
    if args[0] == -1:
        return -1

    for key, value in recipe_list.keys:
        #check if recipe works
        #this doesn't work: nature of 'in'
        if value[0] in this_candy_iteration:
            visited.append(value[0])
            this_candy_iteration.replace(value[0], value[1])
            this_candy_iteration = sorted(this_candy_iteration)
            return mainloop(visited, value[0], this_candy_iteration)



    return -1

def main():
#    add_custom_recipe()
    recipe_list.update({"1" : ("12" , "3333")})
    recipe_list.update({"2" : ("23" , "45")})
    recipe_list.update({"3" : ("114", "5555")})
    recipe_list.update({"4" : ("14" ," 55")})
    
    visitedarr = []
    init_recipe = -1
    print(mainloop(visitedarr, init_recipe, current_candy))    
    return 1



if __name__ == '__main__':
    main()
