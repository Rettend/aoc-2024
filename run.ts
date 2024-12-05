import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import c from 'picocolors'
import * as utils from './src/utils'

const YEAR = 2024

export function formatLog(message: any) {
  if (typeof message !== 'string')
    return message

  return message
    .replace(/`([^`]+)`/g, (_, p1) => `${c.cyan(p1)}`)
    .replace(/~([^~]+)~/g, (_, p1) => `${c.dim(p1)}`)
    .replace(/\*\*([^*]+)\*\*/g, (_, p1) => `${c.bold(p1)}`)
    .replace(/\*([^*]+)\*/g, (_, p1) => `${c.italic(p1)}`)
    .replace(/__([^_]+)__/g, (_, p1) => `${c.underline(p1)}`)
}

const log = console.log
console.log = (...args: any[]) => {
  log(...args.map(formatLog))
}

interface DayConfig {
  day: number
  year?: number
}

async function fetchInput({ day, year = YEAR }: DayConfig): Promise<string> {
  const session = process.env.SESSION
  if (!session)
    throw new Error('SESSION env variable not found')

  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: { Cookie: `session=${session}` },
  })
  return response.text()
}

async function setupDay({ day, year = YEAR }: DayConfig) {
  const dayDir = join('src', `day${String(day).padStart(2, '0')}`)

  if (!existsSync(dayDir))
    mkdirSync(dayDir, { recursive: true })

  const input = await fetchInput({ day, year })
  writeFileSync(join(dayDir, 'input.txt'), input)
  writeFileSync(join(dayDir, 'smol.txt'), '')

  const solutionPath = join(dayDir, 'index.ts')
  if (!existsSync(solutionPath)) {
    const template = `export function part1(input: string) {

}

export function part2(input: string) {

}
`
    writeFileSync(solutionPath, template)
  }
}

async function submitAnswer({ day, year = YEAR, part, answer }: {
  day: number
  year?: number
  part: 1 | 2
  answer: string | number
}) {
  const session = process.env.SESSION
  if (!session)
    throw new Error('SESSION env variable not found')

  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `session=${session}`,
    },
    body: `level=${part}&answer=${answer}`,
  })

  const html = await response.text()

  if (html.includes('That\'s the right answer!')) {
    console.log('✨ Correct answer!')
    await updateReadmeCalendar(day, part)
    return true
  }
  else if (html.includes('That\'s not the right answer')) {
    console.log('❌ Wrong answer')
    return false
  }
  else if (html.includes('You gave an answer too recently')) {
    console.log('⏳ Please wait before submitting again')
    return false
  }

  console.log('❓ Unknown response')
  return false
}

interface Progress {
  [day: number]: 1 | 2
}

async function updateReadmeCalendar(day: number, part: 1 | 2) {
  const readmePath = './README.md'
  const progressPath = './progress.json'

  let progress: Progress = {}
  if (existsSync(progressPath))
    progress = JSON.parse(readFileSync(progressPath, 'utf-8'))

  if (!progress[day] || progress[day] < part)
    progress[day] = part

  writeFileSync(progressPath, JSON.stringify(progress, null, 2))

  const readme = readFileSync(readmePath, 'utf-8')
  const calendarRegex = /<!-- CALENDAR_START -->[\s\S]*<!-- CALENDAR_END -->/
  const calendar = generateCalendar(progress)

  const newReadme = readme.replace(
    calendarRegex,
    `<!-- CALENDAR_START -->\n${calendar}\n<!-- CALENDAR_END -->`,
  )

  writeFileSync(readmePath, newReadme)
}

function generateCalendar(progress: Progress) {
  const days = Array.from({ length: 25 }, (_, i) => i + 1)
  const calendar = ['| M | T | W | T | F | S | S |', '|---|---|---|---|---|---|---|']

  let week: string[] = []
  // Add empty cells for days before December 1st (2024 starts on Sunday)
  for (let i = 0; i < 6; i++)
    week.push('')

  for (const day of days) {
    const stars = progress[day]
      ? '⭐'.repeat(progress[day])
      : ''
    week.push(`<p align="center">[${day}](./src/day${String(day).padStart(2, '0')}/index.ts)<br>${stars}</p>`)

    if (week.length === 7) {
      calendar.push(`|${week.join('|')}|`)
      week = []
    }
  }

  if (week.length > 0) {
    while (week.length < 7)
      week.push('')
    calendar.push(`|${week.join('|')}|`)
  }

  return calendar.join('\n')
}

function benchmark(fn: () => any) {
  const MAX_TIME = 3_000
  const MAX_ITERATIONS = 1_000_000_000
  const startTime = performance.now()
  let iterations = 0
  let result

  while (iterations < MAX_ITERATIONS && (performance.now() - startTime) < MAX_TIME) {
    result = fn()
    iterations++
  }

  const totalTime = performance.now() - startTime
  const avgTime = totalTime / iterations

  return {
    result,
    avgTime,
  }
}

async function runDay(day: number, useSmol = false, doBenchmark = false) {
  const dayDir = join('src', `day${String(day).padStart(2, '0')}`)
  const inputPath = join(dayDir, useSmol ? 'smol.txt' : 'input.txt')

  if (!existsSync(inputPath))
    throw new Error(`Input file not found: ${inputPath}`)

  Object.assign(globalThis, utils)

  const input = readFileSync(inputPath, 'utf-8')
  const solution = await import(`./${dayDir}/index.ts`)

  console.log(`Day ${day}`)

  const p1 = solution.part1(input)
  const p2 = solution.part2(input)

  if (doBenchmark && p1 !== undefined) {
    const { result, avgTime } = benchmark(() => solution.part1(input))
    console.log(`Part 1: \`${result}\` ~(${avgTime.toFixed(4)}ms)~`)
  }
  else {
    console.log('Part 1:', p1)
  }

  if (doBenchmark && p2 !== undefined) {
    const { result, avgTime } = benchmark(() => solution.part2(input))
    console.log(`Part 2: \`${result}\` ~(${avgTime.toFixed(4)}ms)~`)
  }
  else {
    console.log('Part 2:', p2)
  }
}

async function submit(day: number, part: 1 | 2) {
  const dayDir = join('src', `day${String(day).padStart(2, '0')}`)
  const input = readFileSync(join(dayDir, 'input.txt'), 'utf-8')
  const solution = await import(`./${dayDir}/index.ts`)
  Object.assign(globalThis, utils)
  const answer = part === 1 ? solution.part1(input) : solution.part2(input)
  await submitAnswer({ day, part, answer })
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const command = args[0]
  const day = Number(args[1])
  const useSmol = args.includes('-s')
  const doBenchmark = args.includes('-b')

  if (Number.isNaN(day) || day < 1 || day > 25)
    throw new Error('Please provide a valid day (1-25)')

  switch (command) {
    case 'setup':
      await setupDay({ day })
      console.log(`Day ${day} setup complete!`)
      break
    case 'run':
      await runDay(day, useSmol, doBenchmark)
      break
    case 'submit1':
      await submit(day, 1)
      break
    case 'submit2':
      await submit(day, 2)
      break
    default:
      console.log('Usage:')
      console.log('  bun run.ts setup <day>')
      console.log('  bun run.ts run <day> [-s] [-b]')
      console.log('  bun run.ts submit1 <day>')
      console.log('  bun run.ts submit2 <day>')
  }
}
