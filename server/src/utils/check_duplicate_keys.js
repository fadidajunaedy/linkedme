const checkDuplicateKeys = (arr) => {
    const arrayKey = []

    for (let i = 0; i < arr.length; i++) {
        if (arrayKey.includes(arr[i].platform)) {
            return arr[i].platform
        }
        arrayKey.push(arr[i].platform)
    }

    return false
}

module.exports = checkDuplicateKeys