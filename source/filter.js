export function filterValue(value, { maxLength }) {
    let filteredValue = value;
    if (filteredValue.length > maxLength) {
        filteredValue = filteredValue.substr(0, maxLength);
    }
    return filteredValue;
}

export function formatValue(value) {
    let formattedValue = value;
    return formattedValue;
}
