from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import BFS_script24
import util

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

def process_form_data(data):
    input_values = [data.get(f"input{i+1}") for i in range(5)]
    target_candies_values = [data.get(f"target{i+1}") for i in range(5)]


    candy_components = sum([['B']*int(input_values[0]), ['P']*int(input_values[1]), ['G']*int(input_values[2]), ['L']*int(input_values[3]), ['R']*int(input_values[4])], [])
    target_components = sum([['B']*int(target_candies_values[0]), ['P']*int(target_candies_values[1]), ['G']*int(target_candies_values[2]), ['L']*int(target_candies_values[3]), ['R']*int(target_candies_values[4])], [])

    left_input_values = [data.get(f"left_input{i+1}") for i in range(4)]
    right_output_values = [data.get(f"right_output{i+1}") for i in range(4)]

    max_candies = int(data.get("max_candies"))

    for i, val in enumerate(left_input_values):
        left_input_values[i] = util.process_string(val)
    for j, val in enumerate(right_output_values):
        right_output_values[j] = util.process_string(val)

    weaved_dict = {}
    for left, right in zip(left_input_values, right_output_values):
        weaved_dict[left] = right

    path_with_most_candies, len_starting_components, len_remaining = BFS_script24.run_candyworks(candy_components, target_components, your_recipes=weaved_dict, max_candies=max_candies, max_depth=5)
    return {
        'Path With Most Leftover Candies': path_with_most_candies,
        'Remaining Candies': len_remaining
    }


@app.route("/process_form", methods=["POST"])
def process_form():
    data = request.get_json()  # Get JSON data from the request
    result_info = process_form_data(data)
    return jsonify(result=result_info)


if __name__ == "__main__":
    app.run(debug=True)
