
export function getSum (item) {
    return item.subjects.reduce((acc, i) => acc + JSON.parse(i.score), 0)
}
export function getPercent (item) {
    return Math.ceil((getSum(item)/15) * 100)
}

export function getColor (item) {
    const percent = (item/5) * 100
    if (percent <= 49) {
        return 'color: #FF0000'
    } else if (percent >= 50 && percent <= 75) {
        return 'color: #FFA200'
    } else {
        return 'color: #01AA88'
    }
}
export function getSumColor (item) {
    const percent = getPercent(item)
    if (percent <= 49) {
        return 'color: #FF0000'
    } else if (percent >= 50 && percent <= 75) {
        return 'color: #FFA200'
    } else {
        return 'color: #01AA88'
    }
}
export function getPercentStyle (item){
    const percent = getPercent(item)
    let color = ''
    if (percent <= 49) {
        color = '#FF0000'
    } else if (percent >= 50 && percent <= 75) {
        color = '#FFA200'
    } else {
        color = '#01AA88'
    }
    return `--p: ${percent}; --c: ${color}`
}

export function getMobilePercentStyle (item){
    const percent = getPercent(item)
    if (percent <= 49) {
        return '#FF0000'
    } else if (percent >= 50 && percent <= 75) {
        return  '#FFA200'
    } else {
        return  '#01AA88'
    }
}
