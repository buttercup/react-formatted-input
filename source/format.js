/**
 * Format a value for a pattern
 * @param {String} value The value to format
 * @param {Array.<Object>=} formatSpec The formatting specification to apply to the value
 * @returns {String} The formatted value
 */
export function formatValue(value, formatSpec = []) {
    const formats = [...formatSpec];
    if (formats.length > 0) {
        let formattedValue = "",
            currentValue = value;
        while (formats.length > 0 && currentValue.length > 0) {
            const format = formats.shift();
            if (typeof format.match === "object") {
                if (isAnchoredToStart(format.match) !== true) {
                    throw new Error(
                        "Unable to format value: " +
                        `Format regular expression is not anchored to the start of the string: ${format.match.toString()}`
                    );
                }
                while (currentValue.length > 0 && format.match.test(currentValue) !== true) {
                    currentValue = currentValue.substr(1);
                }
                if (currentValue.length > 0) {
                    const matchedText = currentValue.match(format.match)[0];
                    currentValue = currentValue.substr(matchedText.length);
                    formattedValue += matchedText;
                }
            } else if (typeof format.exactly === "string") {
                formattedValue += format.exactly;
                if (currentValue.indexOf(format.exactly) === 0) {
                    currentValue = currentValue.substr(format.exactly.length);
                }
            } else {
                throw new Error(`Unable to format value: Invalid format specification: ${JSON.stringify(format)}`);
            }
        }
        return formattedValue;
    }
    return value;
}

/**
 * Check if a regular expression is anchored to the start of the string
 * Checks to see if the first character in the expression is the start-anchor carat ^
 */
function isAnchoredToStart(regex) {
    const rexpStr = regex.toString();
    return /^\/\^/.test(rexpStr);
}
