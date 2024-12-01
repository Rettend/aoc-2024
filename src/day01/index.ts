export function part1(input: string) {
  const rows = lines(input).map(line => numbers(line))
  const left = rows.map(row => row[0]).sort((a, b) => a - b)
  const right = rows.map(row => row[1]).sort((a, b) => a - b)

  const total = left.reduce((total, leftN, i) => {
    const rightN = right[i]
    return total + Math.abs(rightN - leftN)
  }, 0)

  return total
}

export function part2(input: string) {
  const rows = lines(input).map(line => numbers(line))
  const left = rows.map(row => row[0])
  const right = rows.map(row => row[1])

  const similarity = left.reduce((total, leftN) => {
    const times = right.filter(n => n === leftN).length
    return total + (leftN * times)
  }, 0)

  return similarity
}
