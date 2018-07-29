const NAME_REGEX = /^[a-zA-Z ]*$/

export const isValidName = (name) => {
    const t = name && NAME_REGEX.test(name.trim(""))
    return t
}

export const isValidAmount = amount => amount && !isNaN(amount)

export const checkIfErrorExists = (...rest) => {
    const arrayFlattened = rest.reduce((acc, element) => {
        if(Array.isArray(element)) {
            acc = [...acc, ...element]
        } else {
            acc.push(element)
        }
        return acc
    }, [])
    return arrayFlattened.find(element => element.isError)
}