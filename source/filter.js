export function filterValue(value, { maxLength }) {
    let filteredValue = value;
    if (filteredValue.length > maxLength) {
        filteredValue = filteredValue.substr(0, maxLength);
    }
    return filteredValue;
}
