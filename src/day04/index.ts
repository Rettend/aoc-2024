export function part1(input: string) {
  const g = grid(input)
  const rows = g.length
  const cols = g[0].length
  let count = 0
  const word = 'XMAS'

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ]

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dr, dc] of directions) {
        let i = 0
        for (; i < word.length; i++) {
          const r = row + dr * i
          const c = col + dc * i
          if (r < 0 || r >= rows || c < 0 || c >= cols || g[r][c] !== word[i])
            break
        }
        if (i === word.length)
          count++
      }
    }
  }

  return count
}

export function part2(input: string) {
  const g = grid(input)
  const rows = g.length
  const cols = g[0].length
  let count = 0

  const check = (chars: string[]): boolean => {
    return chars.join('') === 'MAS' || chars.join('') === 'SAM'
  }

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (g[row][col] !== 'A')
        continue

      const [r1, c1, r2, c2] = [row - 1, col - 1, row + 1, col + 1]
      const [r3, c3, r4, c4] = [row - 1, col + 1, row + 1, col - 1]

      if (r1 < 0 || r2 >= rows || c1 < 0 || c2 >= cols)
        continue
      if (r3 < 0 || r4 >= rows || c3 < 0 || c4 >= cols)
        continue

      const diag1 = [g[r1][c1], 'A', g[r2][c2]]
      const diag2 = [g[r3][c3], 'A', g[r4][c4]]

      if (check(diag1) && check(diag2))
        count++
    }
  }

  return count
}
