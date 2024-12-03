export function part1(input: string) {
  const matches = input.match(/mul\((\d+),(\d+)\)/g)

  if (!matches)
    return 0

  return matches.reduce((acc, match) => {
    const [x, y] = numbers(match)
    return acc + x * y
  }, 0)
}

type Match = {
  type: 'mul'
  i: number
  x: number
  y: number
} | {
  type: 'do' | 'dont'
  i: number
}

export function part2(input: string) {
  const muls = input.matchAll(/mul\((\d+),(\d+)\)/g).map(m => ({
    type: 'mul',
    i: m.index,
    x: Number.parseInt(m[1]),
    y: Number.parseInt(m[2]),
  }))
  const dos = input.matchAll(/do\(\)/g).map(m => ({
    type: 'do',
    i: m.index,
  }))
  const donts = input.matchAll(/don't\(\)/g).map(m => ({
    type: 'dont',
    i: m.index,
  }))

  const matches = [...muls, ...dos, ...donts].sort((a, b) => a.i - b.i) as Match[]

  let enabled = true
  return matches.reduce((acc, match) => {
    if (match.type === 'mul') {
      if (enabled)
        return acc + match.x * match.y
    }
    else if (match.type === 'do') {
      enabled = true
    }
    else if (match.type === 'dont') {
      enabled = false
    }
    return acc
  }, 0)
}
