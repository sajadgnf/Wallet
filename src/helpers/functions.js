const shorter = text => {
    const splitText = text.split(' ')
    const newText = `${splitText[0]} ${splitText[1]} ${splitText[2]}`
    return newText
}

export { shorter }