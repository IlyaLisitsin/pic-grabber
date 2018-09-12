const alph = 'abcdefghijklmnopqrstuvwxyz0123456789'

const gen = str => {
    const arr = str.split('').reverse()
    const move = str.split('').reverse().join('').match(/^9*/g)[0].length

    let i = 0
    while (i <= move) {
        if (arr[i] == 9) arr[i] = 'a'
        else arr[i] = alph[alph.indexOf(arr[i]) + 1]
        i++
    }
    return arr.reverse().join('')
}

module.exports = gen