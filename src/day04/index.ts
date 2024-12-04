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

}
