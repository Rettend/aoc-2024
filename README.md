# aoc-2024

Advent of Code 2024 solutions in TypeScript using Bun.

## Progress

<!-- CALENDAR_START -->
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
