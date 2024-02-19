from flask import Flask, render_template, request
import BFS_script24

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def main_app():
    if request.method == "POST":
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
        # You can now pass 'input_values' to your Python script or perform any other desired action.

        candy_components = []
        candy_components.append(['A'] * int(input_values[0]))
        candy_components.append(['B'] * int(input_values[1]))
        candy_components.append(['C'] * int(input_values[2]))
        candy_components.append(['D'] * int(input_values[3]))
        candy_components.append(['E'] * int(input_values[4]))
 

        target_components = []
        target_components.append(['A'] * int(target_candies_values[0]))
        target_components.append(['B'] * int(target_candies_values[1]))
        target_components.append(['C'] * int(target_candies_values[2]))
        target_components.append(['D'] * int(target_candies_values[3]))
        target_components.append(['E'] * int(target_candies_values[4]))

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

        weaved_values = [(left, right) for left, right in zip(left_input_values, right_output_values)]

        
        path_with_most_candies, most_candies, starting_components, remaining = BFS_script24.run_candyworks(candy_components, target_components, weaved_values, max_candies = 24, max_depth = 10)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
