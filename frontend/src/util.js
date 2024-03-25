function processString(inputString) {
    // Define the regular expression pattern to match each single character
    const pattern = /\b\w\b/g;

    // Use match to extract individual characters as an array
    const matches = inputString.match(pattern);

    // Return the matches; if there are no matches, return an empty array
    return matches || [];
}
