var maxPoints = function(points) {
    if (points.length === 1) return 1 // edge case
    const slopes = {} // hashmap - {string: set}
    let maxSet = 0

    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i]
            const [x2, y2] = points[j]

            let slope, b

            if (x2 - x1 === 0) {
                slope = 'undefined'
                b = x1 // or x2, the x values are the same
            } else { 
                slope = (y2 - y1) / (x2 - x1)
                b = y1 - x1 * slope
            }
            const str = `${slope},${b}`
            if (str in slopes) {
                slopes[str].add(`${x1},${y1}`)
                slopes[str].add(`${x2},${y2}`)
                maxSet = Math.max(maxSet, slopes[str].size)
            } else {
                slopes[str] = new Set()
                slopes[str].add(`${x1},${y1}`)
                slopes[str].add(`${x2},${y2}`)
                maxSet = Math.max(maxSet, slopes[str].size)
            }
        }
    }

    return maxSet
};