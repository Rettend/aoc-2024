# aoc-2024

Advent of Code 2024 solutions in TypeScript using Bun.

## Progress

<!-- CALENDAR_START -->
| M | T | W | T | F | S | S |
|---|---|---|---|---|---|---|
|||||||[1](./src/day01) ⭐|
|[2](./src/day02) |[3](./src/day03) |[4](./src/day04) |[5](./src/day05) |[6](./src/day06) |[7](./src/day07) |[8](./src/day08) |
|[9](./src/day09) |[10](./src/day10) |[11](./src/day11) |[12](./src/day12) |[13](./src/day13) |[14](./src/day14) |[15](./src/day15) |
|[16](./src/day16) |[17](./src/day17) |[18](./src/day18) |[19](./src/day19) |[20](./src/day20) |[21](./src/day21) |[22](./src/day22) |
|[23](./src/day23) |[24](./src/day24) |[25](./src/day25) |||||
<!-- CALENDAR_END -->

## Setup

Set up your session token:

- Get your session token from [Advent of Code](https://adventofcode.com/) (check your browser cookies)
- Create a `.env` file in the root directory
- Add your session token: `SESSION=your_session_token_here`

## Usage

To set up a new day's challenge:

```bash
bun run setup <day>
```

To run solutions:

```bash
bun run run <day>     # Run with puzzle input
bun run run <day> -s  # Run with test input (smol.txt)
```

To submit solutions:

```bash
bun run submit1 <day> # Submit part 1 solution
bun run submit2 <day> # Submit part 2 solution
```
