//sorts array of objects by one property
function sortAlphabeticallyByProperty(arr, objProperty = "_id") {
    return arr.sort((a, b) => {
        if (a[objProperty].toLowerCase() < b[objProperty].toLowerCase()) {
            return -1;
        } else {
            return 1;
        }
    });
}

module.exports = {
    sortAlphabeticallyByProperty
}