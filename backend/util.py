import re

def process_string(input_string):
    # Define a regular expression pattern to match each string
    pattern = re.compile(r'\b\w\b')

    # Use findall to extract individual strings
    matches = pattern.findall(input_string)

    # Convert the list of matches to a tuple and return
    return tuple(matches)