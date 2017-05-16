export function filterValue(value, { maxLength }) {
    let filteredValue = value;
    if (filteredValue.length > maxLength) {
        filteredValue = filteredValue.substr(0, maxLength);
    }
    return filteredValue;
}

export function formatValue(value, formatSpec = []) {
    const formats = [...formatSpec];
    if (formats.length > 0) {
        let formattedValue = "",
            currentValue = value;
        while (formats.length > 0) {
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

function isAnchoredToStart(regex) {
    const rexpStr = regex.toString();
    return /^\/\^/.test(rexpStr);
}
