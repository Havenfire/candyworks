from flask import Flask, render_template, request, jsonify
import BFS_script24
import util

app = Flask(__name__)

def process_form_data(request):
    input_values = [
        request.form.get("input1"),
        request.form.get("input2"),
        request.form.get("input3"),
        request.form.get("input4"),
        request.form.get("input5")
    ]

    target_candies_values = [
        request.form.get("target1"),
        request.form.get("target2"),
        request.form.get("target3"),
        request.form.get("target4"),
        request.form.get("target5")
    ]

    candy_components = []
    candy_components += ['B'] * int(input_values[0])
    candy_components += ['P'] * int(input_values[1])
    candy_components += ['G'] * int(input_values[2])
    candy_components += ['L'] * int(input_values[3])
    candy_components += ['R'] * int(input_values[4])

    target_components = []
    target_components += ['B'] * int(target_candies_values[0])
    target_components += ['P'] * int(target_candies_values[1])
    target_components += ['G'] * int(target_candies_values[2])
    target_components += ['L'] * int(target_candies_values[3])
    target_components += ['R'] * int(target_candies_values[4])

    left_input_values = [
        request.form.get("left_input1"),
        request.form.get("left_input2"),
        request.form.get("left_input3"),
        request.form.get("left_input4")
    ]

    right_output_values = [
        request.form.get("right_output1"),
        request.form.get("right_output2"),
        request.form.get("right_output3"),
        request.form.get("right_output4")
    ]

    max_candies = int(request.form.get("max_candies"))
    for i, val in enumerate(left_input_values):
        left_input_values[i] = util.process_string(val)
    for j, val in enumerate(right_output_values):
        right_output_values[j] = util.process_string(val)

    weaved_dict = {}
    for left, right in zip(left_input_values, right_output_values):
        weaved_dict[left] = right

    path_with_most_candies, len_starting_components, len_remaining = BFS_script24.run_candyworks(
        candy_components, target_components, your_recipes=weaved_dict, max_candies=max_candies, max_depth=5)
    print(path_with_most_candies, len_starting_components, len_remaining)
    return {
        'Path With Most Leftover Candies': path_with_most_candies,
        'Remaining Candies': len_remaining
    }


@app.route("/", methods=["GET", "POST"])
def main_app():
    return render_template("index.html")


@app.route("/process_form", methods=["POST"])
def process_form():
    result_info = process_form_data(request)
    print("Result_info:", result_info)

    return jsonify(result=result_info, input_values=request.form)


if __name__ == "__main__":
    app.run(debug=True)
