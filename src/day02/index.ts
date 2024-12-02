export function part1(input: string) {
  let safe = 0

  for (const report of lines(input)) {
    const levels = numbers(report)

    if (isSafe(levels))
      safe++
  }

  return safe
}

function isSafe(levels: number[]): boolean {
  const differences = levels.slice(1).map((n, i) => n - levels[i])
  const allIncreasing = differences.every(d => d > 0)
  const allDecreasing = differences.every(d => d < 0)
  const validDifferences = differences.every(d => Math.abs(d) >= 1 && Math.abs(d) <= 3)

  return (allIncreasing || allDecreasing) && validDifferences
}

export function part2(input: string) {
  let safe = 0

  for (const report of lines(input)) {
    const levels = numbers(report)

    if (isSafe(levels)) {
      safe++
      continue
    }

    for (let i = 0; i < levels.length; i++) {
      const filtered = [...levels.slice(0, i), ...levels.slice(i + 1)]
      if (isSafe(filtered)) {
        safe++
        break
      }
    }
  }

  return safe
}
